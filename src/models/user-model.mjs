// user-model.mjs
import promisePool from "../utils/database.mjs";

// list all of the users in the database
const listAllUsers = async () => {
  try {
    const sql = "SELECT user_id, username, user_level, title FROM Users";
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("listAllUsers:", error);
    return { error: 500, message: "db error" };
  }
};

const listAllStudents = async () => {
  try {
    const sql = 'SELECT user_id, username, title FROM Users WHERE user_level = "' + 'regular"';
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Model: listAllStudents:');
    return {error: 500, message: 'db error'};
  }
};

// List all of the user's info
// still returns an empty set even if set is empty??
const selectUserById = async (id) => {
  try {
    const sql = "SELECT username, user_level, title, user_id FROM Users WHERE user_id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    if (rows.length == 0) {
      return { error: 404, message: `No user found by id ${id}` };
    } else {
      return rows;
    }
  } catch (error) {
    console.log("listUserbyId:", error);
  }
  return { error: 500, message: "db error" };
};

// Used for hpc and admin login
const selectUserByUsername = async (username) => {
 try {
  const sql = 'SELECT * FROM Users WHERE email=?'; 
  const params = [username];
  console.log(username);
  const [rows] = await promisePool.query(sql, params);
  if (rows.length === 0) {
    return {error: 401, message: 'Unauthorized: Invalid username or password'};
  } else {
    console.log(rows[0].user_level);
    if (rows[0].user_level === 'hcp' || rows[0].user_level === 'admin') {
      return rows[0];
    } else {
      
      return {error: 403, message: 'Unauthorized: userlevel is too low'};
    }
  }
  } catch (error) {
    console.error('Model: selectUserByusername', error);
    return {error: 500, message: 'db error'};
  }
};

// Returns the ids of users that are in riskgroup
const selectUsersByRiskgroup = async () => {
  try {
    const risk_group = "kyllä";
    const sql = 'SELECT user_id FROM users WHERE risk_group = "' + risk_group + '"';
    console.log(sql);
    const [rows] = await promisePool.query(sql);
    return rows
  } catch (error) {
    console.error('Model: selectUsersByRiskgroup', error);
    return {error: 500, message: 'db error'};
  }
};

// Create new user profile with regular privs and title 'Opiskelija'
const insertUser = async (user) => {
  try {
    const sql =
      "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
    const params = [
      user.username,
      user.password,
      user.email,
    ];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return { message: "new user created", user_id: result.insertId };
  } catch (error) {
    console.error("InsertUser:", error);
    return { error: 500, message: "db error" };
  }
};

// Edit existing user
const updateUserInfoById = async (user) => {
  try {
    // const sql = 'UPDATE Users SET username=?, password=?, first_name=?, last_name=? WHERE user_id=?';
    const sql =
      "UPDATE Users SET username=?, password=?, first_name=?, last_name=?, chat_permission=?, chat_permission_date=? WHERE user_id=?";
    const params = [
      user.username,
      user.hashedPassword,
      user.first_name,
      user.last_name,
      user.chat_permission,
      user.chat_permission_date,
      user.user_id,
    ];
    console.log(params);
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows == 0) {
      return { error: 500, message: "db error, data not changed" };
    }
    return { message: "user info updated", result };
  } catch (error) {
    console.error("updateUserById:", error);
    return { error: 500, message: "db error" };
  }
};

// remove user based on id
// remove all the entries of the user prior to deleting the user??

const deleteUserById = async (id) => {
  try {
    const sql = "DELETE FROM Users WHERE user_id=?";
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return { error: 404, message: "user not found" };
    }
    return { message: "user deleted", user_id: id };
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error("deleteUserById:", error);
    return { error: 500, message: "db error" };
  }
};

// used for login
const selectUserByEmail = async (email) => {
  try {
    const sql = "SELECT * FROM Users WHERE email=?";
    const params = [email];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return { error: 404, message: "user not found" };
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error("selectUserByEmail", error);
    return { error: 500, message: "db error" };
  }
};
//login
// TODO: Implement kubios login

//update user priviledges
//move to admin model??
/*const updateUserPriviledges = async (user) => {
  try {
    const sql = 'UPDATE Users SET user_level=?, title=? WHERE id=?';
    const params = [user.user_level, user.title, user.user_id];
    const result = await promisePool.query(sql,params);
    if (result.affectedRows === 0) {
      return {error: 500, message: 'db error, data not changed'};
    } else {
      return {message: `User ${user.user_id} priviledges updated to ${user.user_level}`};
    }
  } catch (error) {
    console.error('updateUserPriviledges: ',error );
    return {error: 500, message: 'db error'};
  }
};*/

//update riskgroup
const updateRiskgroupByUserId = async(user_id) => {
  try {
    // const riskGroup = kyllä;
    const sql = `UPDATE users SET risk_group="kyllä` + `" WHERE user_id=${user_id}`;
    console.log(sql);
    const [rows] = await promisePool.query(sql);
    console.log(rows); 
    if (rows.affectedRows === 0) {
      return {error: 404, message: 'user not found' };
    } else {
      return {message: 'User riskgroup updated'};
    }
    
  } catch (error) {
    console.error('updateRiskgroupByUserId: ',error );
    return {error: 500, message: 'db error'};
  }
};

// TODO: Implement

//update chat priviledges
// TODO: Implement routes

export {
  listAllUsers,
  listAllStudents,
  selectUserById,
  insertUser,
  updateUserInfoById,
  deleteUserById,
  selectUserByEmail,
  selectUserByUsername,
  selectUsersByRiskgroup,
  updateRiskgroupByUserId
};
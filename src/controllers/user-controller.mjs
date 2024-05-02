// user-controller.mjs
import {deleteUserById, insertUser, listAllStudents, listAllUsers, selectUserById, selectUsersByRiskgroup, updateUserInfoById} from '../models/user-model.mjs';
import bcrypt from 'bcryptjs';

// get all of the users info
const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// get user's info by id
const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

// Post a new user to db
const postNewUser = async(req, res) => {
  const {username, password, first_name, last_name} = req.body;
  if (username && password && first_name && last_name) {
    const result = await insertUser ({
      username,
      password,
      first_name,
      last_name
    }); 
   if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// Edit user info
const putUserById = async (req, res) => {
  const user_id = req.params.id;
  const {username, password, first_name, last_name, chat_permission, chat_permission_date} = req.body;
  // console.log(username, password, first_name, last_name); 
  //  console.log('controller:', chat_permission, chat_permission_date);
  // console.log(user_id);

  // hashes password if it is included in the request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    if (user_id && username && hashedPassword && first_name && last_name && chat_permission && chat_permission_date) {
    const result = await updateUserInfoById({
      username,
      hashedPassword,
      first_name,
      last_name,
      chat_permission,
      chat_permission_date,
      user_id,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

// delete user
const removeUser = async (req, res) => {
  const user_id = req.params.id;
  const result = await deleteUserById(user_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result); 
}; 

/*const putUserPriviledges = async (req, res) => {
  const user_id = req.params.id;
  const {user_level, title} = req.body;
  if (user_level && title && user_id) {
    const result = await updateUserPriviledges({
      user_level,
      title,
      user_id
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};*/

const getAllStudents = async(req, res) => {
  const result = await listAllStudents();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result); 
};

export {getUsers,
  getUserById,
  postNewUser,
  putUserById,
  removeUser,
  getAllStudents,
  };

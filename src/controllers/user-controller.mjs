// user-controller.mjs
import {deleteUserById, insertUser, listAllStudents, listAllUsers, selectUserById, selectUsersByRiskgroup, updateUserInfoById} from '../models/user-model.mjs';
import bcrypt from 'bcryptjs';

// get all of the users info
const getUsers = async (req, res) => {
  const user_level = req.user.user_level;
  if (user_level === 'admin') {
    const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
  } else {
    return res.status(403).json('error: 403, message: forbidden');
  }
  
};

// get user's info by id
const getUserById = async (req, res) => {
  // const user = req.user;
  // console.log(user);
  const user_level = req.user.user_level;
  // console.log(user_level); 
  const user_id = req.user.userId;
  // console.log(user_id);
  // console.log(req.params.id);

  // console.log(user_level);
  if ( user_id == req.params.id || user_level == 'admin' || user_level == 'hcp') {
    const result = await selectUserById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json('error: 403, message: Forbidden');
  }
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
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  console.log(user_id);
  console.log(user_id_token);
  if (user_level === 'admin' || user_id_token == user_id) {
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
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

// delete user
const removeUser = async (req, res) => {
  const user_id = req.user.userId;
  const user_level = req.user.user_level;
  if ( user_id == req.params.id || user_level === 'admin') {
    const result = await deleteUserById(req.params.id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result); 
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
}; 

const getAllStudents = async(req, res) => {
  const user_level = req.user.user_level;
  if (user_level && (user_level == 'hcp' || user_level == 'admin')) {
    console.log(user_level);
    const result = await listAllStudents();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result); 
  } else {
    return res.status(403).json('error: 403, message: Forbidden');
  }
};

export {getUsers,
  getUserById,
  postNewUser,
  putUserById,
  removeUser,
  getAllStudents,
  };

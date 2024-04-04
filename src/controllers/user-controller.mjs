// user-controller.mjs
import {deleteUserById, insertUser, listAllUsers, selectUserbyId, updateUserInfoById} from '../models/user-model.mjs';
// import bcrypt from 'bcryptjs';

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await selectUserbyId(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

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

const putUserById = async (req, res) => {
  const user_id = req.params.id;
  const {username, password, first_name, last_name, chat_permission, chat_permission_date} = req.body;
  // console.log(username, password, first_name, last_name); 
   console.log('controller:', chat_permission, chat_permission_date);
  // console.log(user_id);
  if (user_id && username && password && first_name && last_name && chat_permission && chat_permission_date) {
    const result = await updateUserInfoById({
      username,
      password,
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

const removeUser = async (req, res) => {
  const user_id = req.params.id;
  const result = await deleteUserById(user_id)
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

export {getUsers,
  getUserById,
  postNewUser,
  putUserById,
  removeUser
  };

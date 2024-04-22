import {customError} from '../middlewares/error-handler.mjs';
import { addEntry, listLifestyleDataByUserId } from '../models/lifestyle-model.mjs';

// Post lifestyle survey by user id
const postEntry = async (req, res, next) => {
    const userId = req.user.user_id;
    const result = await addEntry(req.body, userId);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      next(new Error(result.error));
    }
  };

 // get lifestyle survey data by user id 
const getLifestyleDataByUserId = async (req, res) => {
  const user_id = req.params.id;
  const result = await listLifestyleDataByUserId(user_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
}; 

  export {
    postEntry,
    getLifestyleDataByUserId
  };
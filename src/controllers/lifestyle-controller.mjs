import {customError} from '../middlewares/error-handler.mjs';
import { addEntry, listLifestyleDataByUserId } from '../models/lifestyle-model.mjs';

// Post lifestyle survey by user id
const postEntry = async (req, res, next) => {
  const user_id_token = req.user.userId;
  const {
    user_id,
    entry_date,
    caffeine_intake,
    nicotine_intake,
    alcohol_intake,
    hours_slept,
    enough_sleep,
    quality_sleep,
    physical_activity,
    duration,
    intensity,
  } = req.body;
  if (user_id && entry_date) {
    if (user_id == user_id_token ) {
      const result = await addEntry(req.body, user_id_token);
      console.log(result); 
      if (result.lifestyle_id) {
        res.status(201);
        res.json({message: 'New entry added.', ...result});
      } else {
        next(new Error(result.error));
      }
    } else {
      return res.status(403).json({error: 403, message: 'Forbidden'}); 
    }
  } else {
    return res.status(404).json({error: 404, message: 'Bad request'});
  }
};

 // get lifestyle survey data by user id 
const getLifestyleDataByUserId = async (req, res) => {
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const user_id = req.params.id;
  if (user_id_token == user_id || user_level === 'hcp' || user_level === 'admin') {
    const result = await listLifestyleDataByUserId(user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'}); 
  }

}; 

export {
  postEntry,
  getLifestyleDataByUserId
  };
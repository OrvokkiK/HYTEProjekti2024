import {customError} from '../middlewares/error-handler.mjs';
import { addEntry } from '../models/lifestyle-model.mjs';


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

  export {
    postEntry,
  };
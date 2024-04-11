import { addHrv } from "../models/hrv-model.mjs";
import {customError} from '../middlewares/error-handler.mjs';

const postHrv = async (req, res, next) => {
    const userId = req.user.user_id;
    const result = await addHrv(req.body, userId);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New Hrv added.', ...result});
    } else {
      next(new Error(result.error));
    }
  };

  export {
    postHrv,
  };
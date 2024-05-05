import { addHrv, listHrvByUserId } from "../models/hrv-model.mjs";
import {customError} from '../middlewares/error-handler.mjs';

const postHrv = async (req, res, next) => {
  const user_id_token = req.user.userId;
  console.log(req.body);
  const {
    entry_date,
    stress_index,
    mood,
    av_hrv,
    mean_rr_ms,
    sdnn_ms,
    readiness,
  } = req.body;
  if (entry_date && stress_index && mood && av_hrv && mean_rr_ms && sdnn_ms && readiness) {
    const result = await addHrv(req.body, user_id_token);
    console.log(result);
    if (result.hrv_id) {
      res.status(201);
      res.json({message: 'New Hrv added.', ...result});
    } else {
      next(new Error(result.error));
    }
  } else {
    return res.status(404).json({error: 404, message: 'Bad request'});
  }
};

const getHrvDataByUserId = async (req, res) => {
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const user_id = req.params.id;
  if (user_id == user_id_token || user_level === 'hcp' || user_level === 'admin') {
    const result = await listHrvByUserId(user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

export {
  postHrv,
  getHrvDataByUserId
};
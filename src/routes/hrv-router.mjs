import express from "express";
import { body, param } from "express-validator";
import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import { getHrvDataByUserId, postHrv } from "../controllers/hrv-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const hrvRouter = express.Router();

hrvRouter.post('/',
  body('user_id').isInt(),
  body('av_hrv').isNumeric(),
  body('stress_index').isNumeric(),
  body('readiness').isNumeric(),
  body('mean_rr_ms').isNumeric(),
  body('sdnn_ms').isNumeric(),
  body('entry_date').isDate(),
  body('user_happiness').isInt().optional({nullable: true, checkFalsy: true}),
  validationErrorHandler,
  authenticateToken, postHrv
);


// sample body for post REQ
/*
  currentHrvData = {
  user_id: userId,
  av_hrv: mean_hr_bpm,
  stress_index,
  mood,
  readiness,
  mean_rr_ms,
  sdnn_ms,
  entry_date: currentDate,
  user_happiness,
*/

hrvRouter.route('/:id').get(authenticateToken, getHrvDataByUserId);

export default hrvRouter;
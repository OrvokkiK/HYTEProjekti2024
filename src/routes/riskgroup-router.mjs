// riskgroup-router.mjs
import express from 'express';
import { body, param } from "express-validator";
import { validationErrorHandler } from "../middlewares/error-handler.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { getUsersByRiskgroup, putUsersRiskgroup } from '../controllers/riskgroup-controller.mjs';

const riskgroupRouter = express.Router();

// Routes for /api/riskgroup/
riskgroupRouter.route('/').get(authenticateToken, getUsersByRiskgroup);

// Routes /api/riskgroup/:id
riskgroupRouter.put('/:id', 
  body('risk_group_date').isISO8601(),
  validationErrorHandler,
  authenticateToken, putUsersRiskgroup
);

export default riskgroupRouter; 
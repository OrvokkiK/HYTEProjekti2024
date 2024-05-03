// riskgroup-router.mjs
import express from 'express';
import { getUsersByRiskgroup, putUsersRiskgroup } from '../controllers/riskgroup-controller.mjs';

const riskgroupRouter = express.Router();

// Routes for /api/riskgroup/
riskgroupRouter.route('/').get(getUsersByRiskgroup);

// Routes /api/riskgroup/:id
riskgroupRouter.route('/:id').put(putUsersRiskgroup);
export default riskgroupRouter; 
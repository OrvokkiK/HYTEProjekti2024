// analysis-router.mjs
import express from 'express';
import { deleteAnalysis, getAllAnalyses, getAnalysisById, postAnalysis, putAnalysis } from '../controllers/analysis-controller.mjs';
import { authenticateToken } from "../middlewares/authentication.mjs";
const analysisRouter = express.Router();

// /api/analysis/ routes
analysisRouter.route('/')
.get(getAllAnalyses)
.post(authenticateToken, postAnalysis);

// /api/analysis/:id routes
analysisRouter.route('/:id')
.get(getAnalysisById)
.put(putAnalysis)
.delete(deleteAnalysis);

export default analysisRouter
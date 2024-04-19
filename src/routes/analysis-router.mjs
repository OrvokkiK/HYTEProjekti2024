// analysis-router.mjs
import express from 'express';
import { deleteAnalysis, getAllAnalyses, getAnalysesByUserId, getAnalysisById, postAnalysis, putAnalysis } from '../controllers/analysis-controller.mjs';

const analysisRouter = express.Router();

// /api/analysis/ routes
analysisRouter.route('/').get(getAllAnalyses).post(postAnalysis);

// /api/analysis/:id routes
analysisRouter.route('/:id')
.get(getAnalysisById)
.put(putAnalysis)
.delete(deleteAnalysis);

// /api/analysis/:id routes
analysisRouter.route('/user/:id').get(getAnalysesByUserId);

export default analysisRouter
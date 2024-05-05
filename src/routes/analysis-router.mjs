// analysis-router.mjs
import express from 'express';
import { deleteAnalysis, getAllAnalyses, getAnalysesByUserId, getAnalysisById, postAnalysis, putAnalysis } from '../controllers/analysis-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const analysisRouter = express.Router();

// /api/analysis/ routes
analysisRouter
.route('/')
.get(
    authenticateToken, 
    getAllAnalyses)
.post(
    authenticateToken, postAnalysis);

// /api/analysis/:id routes
analysisRouter.route('/:id')
.get(
    authenticateToken,
    getAnalysisById)
.put(
    authenticateToken,
    putAnalysis)

// /api/analysis/:id routes
analysisRouter.route('/user/:id').get(authenticateToken, getAnalysesByUserId);


// /api/analysis/:id/user/:user_id

analysisRouter.route('/:id/user/:user_id/').delete(authenticateToken, deleteAnalysis);

export default analysisRouter
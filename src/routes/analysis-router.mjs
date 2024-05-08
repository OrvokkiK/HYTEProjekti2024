// analysis-router.mjs
import express from 'express';
import {body} from 'express-validator';
import { deleteAnalysis, getAllAnalyses, getAnalysesByUserId, getAnalysisById, postAnalysis, putAnalysis } from '../controllers/analysis-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

const analysisRouter = express.Router();

// /api/analysis/ routes
analysisRouter
.route('/')
.get(
  authenticateToken, 
  getAllAnalyses
);

analysisRouter.post('/',
  body('user_id').isInt(), 
  body('analysis_result').isIn(["Matala stressitaso", "Kohtalainen stressitaso", "Korkea stressitaso"]).notEmpty(),
  body('analysis_enumerated').isInt({min:1, max:3}).notEmpty(),
  body('created_at').isISO8601(),
  validationErrorHandler, 
  authenticateToken, postAnalysis
);

// /api/analysis/:id routes
analysisRouter.route('/:id')
.get(
  authenticateToken,
  getAnalysisById
);

analysisRouter.put('/:id',
  body('user_id').isInt(),
  body('analysis_result').isIn(["Matala stressitaso", "Kohtalainen stressitaso", "Korkea stressitaso"]),
  body('analysis_enumerated').isInt({min:1, max:3}),
  body('created_at').isISO8601(),
  validationErrorHandler,
  authenticateToken,
  putAnalysis
);

// /api/analysis/:id routes
analysisRouter.route('/user/:id').get(authenticateToken, getAnalysesByUserId);


// /api/analysis/:id/user/:user_id

analysisRouter.route('/:id/user/:user_id/').delete(authenticateToken, deleteAnalysis);

export default analysisRouter
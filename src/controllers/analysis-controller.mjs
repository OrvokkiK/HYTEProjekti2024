// analysis-controller.mjs

import { deleteAnalysisById, insertAnalysis, selectAllAnalyses, selectAnalysesByUserId, selectAnalysisbyId, updateAnalysisById } from "../models/analysis-model.mjs";
import promisePool from "../utils/database.mjs";

// Get all Analyses
const getAllAnalyses = async (req, res) => {
  const result = await selectAllAnalyses();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getAnalysesByUserId = async (req,res) => {
    const user_id = req.params.id
    const result = await selectAnalysesByUserId(user_id);
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.json(result);
};

const getAnalysisById = async (req, res) => {
    const analysis_id = req.params.id
    const result = await selectAnalysisbyId(analysis_id);
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.json(result);
};

const postAnalysis = async(req, res) => {
    console.log('postAnalysis, controller')
  const {
    user_id,
    analysis_result,
    analysis_enumerated,
    created_at
  } = req.body;
  if (user_id && analysis_result && analysis_enumerated && created_at) {
    const result = await insertAnalysis(req.body);
    if (result.error) {
        return res.status(result.error).json(result);
    } else {
      return res.json(result);
    }
  } else {
    return {error: 404, message: 'bad request'};
  }
};

const putAnalysis = async (req, res) => {
  const entry_id = req.params.id;
  const {
  analysis_result,
  analysis_enumerated,
  created_at
  } = req.body;
  if (analysis_result && analysis_enumerated && created_at && entry_id) {
    const result = await updateAnalysisById(req.body, entry_id);
    console.log(result);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return {error: 404, message: 'bad request'};
  }
};

const deleteAnalysis = async (req, res) => {
  const analysis_id = req.params.id
  const result = await deleteAnalysisById(analysis_id)
  if (result.error) {
    return res.statut(result.error).json(result);
  }
  return res.json(result);
};

export {
  getAllAnalyses,
  getAnalysesByUserId,
  getAnalysisById,
  postAnalysis,
  putAnalysis,
  deleteAnalysis
}
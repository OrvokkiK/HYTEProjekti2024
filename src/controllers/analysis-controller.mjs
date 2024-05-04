// analysis-controller.mjs

import { deleteAnalysisById, insertAnalysis, selectAllAnalyses, selectAnalysesByUserId, selectAnalysisbyId, updateAnalysisById } from "../models/analysis-model.mjs";

// Get all Analyses in db
const getAllAnalyses = async (req, res) => {
  const user_level = req.user.user_level;
  if (user_level && (user_level === 'hcp' || user_level === 'admin')) {
    const result = await selectAllAnalyses();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const getAnalysesByUserId = async (req,res) => {
  const user_id_token = req.user.userId;
  // console.log(user_id_token);
  const user_id = req.params.id;
  // console.log(user_id);
  const user_level = req.user.user_level;
  if (user_id_token == user_id || user_level === 'admin' || user_level === 'hcp' ) {
    const result = await selectAnalysesByUserId(user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const getAnalysisById = async (req, res) => {
  // const user = req.user;
  // console.log(user);
  const user_id = req.user.userId;
  // console.log(user_id);
  const user_level = req.user.user_level;
  const analysis_id = req.params.id;
  const result = await selectAnalysisbyId(analysis_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  if (user_id == result.user_id || user_level === 'hcp' || user_level === 'admin') {
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const postAnalysis = async(req, res) => {
  const user_id_token = req.user.userId;
  // const user_level = req.user.user_level;
  const {
    user_id,
    analysis_result,
    analysis_enumerated,
    created_at
  } = req.body;
  if (user_id_token == user_id) {
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
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const putAnalysis = async (req, res) => {
  const entry_id = req.params.id;
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const {
  user_id, 
  analysis_result,
  analysis_enumerated,
  created_at
  } = req.body;
  if (user_id_token == user_id || user_level === 'admin') {
    if (user_id, analysis_result && analysis_enumerated && created_at && entry_id) {
      const result = await updateAnalysisById(req.body, entry_id);
      console.log(result);
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.json(result);
    } else {
      return {error: 404, message: 'bad request'};
    }
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const deleteAnalysis = async (req, res) => {
  const user_id_token = req.user.userId;
  const user_id = req.params.user_id;
  const user_level = req.user.user_level;
  const analysis_id = req.params.id;

  if (user_id == user_id_token || user_level === 'admin') {
    const result = await deleteAnalysisById(analysis_id);
    if (result.error) {
      return res.statut(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

export {
  getAllAnalyses,
  getAnalysesByUserId,
  getAnalysisById,
  postAnalysis,
  putAnalysis,
  deleteAnalysis
}
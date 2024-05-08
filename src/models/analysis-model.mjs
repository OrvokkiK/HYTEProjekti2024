// analysis-model.mjs
import promisePool from "../utils/database.mjs";

// List all entries from Complete_analysis
const selectAllAnalyses = async () => {
  try {
    const sql = 'SELECT * FROM Complete_analysis;'
    const [rows] = await promisePool.query(sql); 
    return rows;
  } catch (error) {
    console.error('Model: selectAllAnalysis: ', error);
    return {error: 500, message: 'db error'};
  }
};

// Lists all entries by specified user from Complete_analysis
const selectAnalysesByUserId = async (user_id) => {
  try {
    const sql = `SELECT * FROM Complete_analysis WHERE user_id=${user_id};`
    const [rows] = await promisePool.query(sql);
    if (rows.length === 0) {
      return {error: 404, message: `Analysis not found by user ${user_id}`};
    } else {
      return rows
    }
  } catch (error) {
    console.error('[Model] selectAnalysisByUserId: ', error);
    return {error: 500, message: 'db error'};
  }
};

// Lists a Complete_analysis by analysis_id
const selectAnalysisbyId = async (analysis_id) => {
  try {
    const sql = `SELECT * FROM Complete_analysis WHERE analysis_id=${analysis_id};`
    const [rows] = await promisePool.query(sql);
    if (rows.length === 0) {
      return {error: 404,  message: 'No entry found'};
    } else {
        return rows;
    }
  } catch (error) {
    console.error('Model: SelectSpecificAnalysis: ', error);
    return {error: 500, message: 'db Error'};
  }
};

// Add a new entry into Complete_analysis
const insertAnalysis = async (entry) => {
  try {
    const sql = 'INSERT INTO Complete_analysis (user_id, analysis_result, analysis_enumerated, created_at) VALUES (?, ?, ?, ?);'
    const params = [entry.user_id, entry.analysis_result, entry.analysis_enumerated, entry.created_at];
    const [rows] = await promisePool.query(sql, params);
    console.log(rows);
    return {analysis_id: rows.insertId}
  } catch (error) {
    console.error('Model: InsertAnalysis: ', error);
    return {error: 500, message: 'db error'};
  }
};

// Update an entry in Complete_analysis
const updateAnalysisById = async (entry, entry_id) => {
  try {
    const sql = 'UPDATE Complete_analysis SET user_id=?, analysis_result=?, analysis_enumerated=?, created_at=? WHERE analysis_id=?';
    const params = [entry.user_id, entry.analysis_result, entry.analysis_enumerated, entry.created_at, entry_id];
    const [rows] = await promisePool.query(sql, params);
    console.log('model:', rows);
    console.log('model:', rows.changedRows)
    if (rows.changedRows === 1) {
      return {message: 'Complete analysis entry changed'}
    } else {
      return {error: 404, message: 'Entry not found'};
    }
  } catch (error) {
    console.error('Model, updateAnalysisById:', error);
    return {error: 500, message: 'db error'};
  }
};

// DELETE Entry in Complete_analysis
const deleteAnalysisById = async (analysis_id) => {
  try {
    const sql = `DELETE FROM Complete_analysis WHERE analysis_id=${analysis_id}`;
    const [rows] = await promisePool.query(sql);
    if (rows.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    } else {
      return {message: `Complete analysis by id ${analysis_id} deleted`};
    }
  } catch (error) {
    console.error('[Model] deleteEntryById: ', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  selectAllAnalyses,
  selectAnalysisbyId,
  selectAnalysesByUserId,
  insertAnalysis,
  updateAnalysisById,
  deleteAnalysisById,
};
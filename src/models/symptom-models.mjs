//symptom-models.mjs
import promisePool from '../utils/database.mjs'

//List all users' symptoms
const listAllSymptoms = async () => {
  try {
    const sql = 'SELECT * FROM Symptoms;'
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.log('listAllsymptoms:', error);
    return {error: 500, message: 'db error'};    
  }
};

//Lists all the symptoms of a user
const listSymptomsByUserId = async (user_id) => {
  try {
    const sql = 'SELECT * FROM Symptoms WHERE user_id=?';
    const params = [user_id]
    const [rows] = await promisePool.query(sql, params);
    console.log(rows);
    if (rows.length === 0 ) {
      return {error: 404, message: `No symptom entries found by user_id ${user_id}`};
    } else {
      return rows;   
    };
  } catch (error) {
    console.error('listSymptomsByUserId: ', error.message);
    return {error: error.message};
  }
};

const listSymptomsBySymptomId = async (id, user_id) => {
  try {
    const sql = 'SELECT * FROM Symptoms WHERE symptom_id=? and user_id=?';
    const params = [id, user_id];
    const [rows] = await promisePool.query(sql,params);
    if (rows.length === 0) {
      return {error: 404, message: `No symptom entries found by id ${id}`}; 
    }
    return rows;
  } catch (error) {
    console.error('listSymptomsBySymptomId: ', error.message);
    return {error: error.message};
  }
};

const addSymptoms = async (entry, user_id) => {
  const {
    entry_date, 
    frustration, 
    grumpiness, 
    recall_problems, 
    restlesness, 
    disquiet, 
    tiredness, 
    anxiety, 
    difficulty_making_decisions, 
    sleep_disturbances, 
    changes_in_appetite, 
    headache, 
    neck_pain, 
    vertigo, 
    palpitation, 
    nausea, 
    upset_stomach, 
    recurring_colds, 
    back_issues, 
    stress_level} = entry;
  const sql = 'INSERT INTO Symptoms (entry_date, frustration, grumpiness, recall_problems, restlesness, disquiet, tiredness, anxiety, difficulty_making_decisions, sleep_disturbances, changes_in_appetite, headache, neck_pain, vertigo, palpitation, nausea, upset_stomach, recurring_colds, back_issues, stress_level, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )';
  const params = [
    entry_date, 
    frustration, 
    grumpiness, 
    recall_problems, 
    restlesness, 
    disquiet, 
    tiredness, 
    anxiety, 
    difficulty_making_decisions, 
    sleep_disturbances, 
    changes_in_appetite, 
    headache, 
    neck_pain, 
    vertigo, 
    palpitation, 
    nausea, 
    upset_stomach, 
    recurring_colds, 
    back_issues, 
    stress_level, 
    user_id
  ];
  console.log(params);
  try {
    const rows = await promisePool.query(sql, params);  
    return {entry_id: rows[0].insertId};   
  } catch (error) {
    console.error('[Model] addSymptoms: ', error.message);
    return {error: error.message}; 
  }
};

// INSERT (edit) an existing entry;
const updateEntryById = async (entry) => {
  // console.log('Model: entry ', entry);
  const sql = 'UPDATE Symptoms SET frustration=?, grumpiness=?, recall_problems=?, restlesness=?, disquiet=?, tiredness=?, anxiety=?, difficulty_making_decisions=?, sleep_disturbances=?, changes_in_appetite=?, headache=?, neck_pain=?, vertigo=?, palpitation=?, nausea=?, upset_stomach=?, recurring_colds=?, back_issues=?, stress_level=?, user_id=? WHERE symptom_id=?';
  const params = [
    entry.frustration, 
    entry.grumpiness, 
    entry.recall_problems, 
    entry.restlesness, 
    entry.disquiet, 
    entry.tiredness, 
    entry.anxiety, 
    entry.difficulty_making_decisions, 
    entry.sleep_disturbances, 
    entry.changes_in_appetite, 
    entry.headache, 
    entry.neck_pain, 
    entry.vertigo, 
    entry.palpitation, 
    entry.nausea, 
    entry.upset_stomach, 
    entry.recurring_colds, 
    entry.back_issues, 
    entry.stress_level,
    entry.user_id,
    entry.symptom_id];
    // console.log('Model: params', params);
  try {
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    if (rows.changedRows === 1) {
      return rows;
    } else {
      return {error: 404, message: 'Entry not found'};
    }
  } catch (error) {
    console.log('[Model] insertEntryById: ', error);
    return {error: 500, message: 'db error'};
  }
};

// DELETE an entry in symptoms
const deleteSymptomById = async (symptom_id, user_id) => {
  try {
    const sql = `DELETE FROM Symptoms WHERE symptom_id=${symptom_id} AND user_id=${user_id}`;
    // console.log(sql); 
    const [rows] = await promisePool.query(sql);
    if (rows.affectedRows ===  0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: `Entry ${symptom_id} deleted`};
  } catch (error) {
    console.error('[Model] deleteSymptomsById: ', error);
    return {error: 500, message: 'db error'};
  }
}

export {
  listAllSymptoms,
  listSymptomsByUserId,
  listSymptomsBySymptomId,
  addSymptoms,
  updateEntryById,
  deleteSymptomById
}; 
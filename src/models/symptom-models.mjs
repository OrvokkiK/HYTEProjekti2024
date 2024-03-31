//symptom-models.mjs
import promisePool from '../utils/database.mjs'

//List all users' symptoms
const listAllSymptoms = async () => {
  try {
    const sql = 'SELECT * FROM SYMPTOMS;'
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
    const sql = 'SELECT * FROM SYMPTOMS WHERE user_id=?';
    const params = [user_id]
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0 ) {
      return {error: 404, message: `No symptom entries found by user_id${user_id}`};
    } else {
      return rows;   
    };
  } catch (error) {
    console.error('listSymptomsByUserId: ', error.message);
    return {error: error.message};
  }
};

const listSymptomsBySymptomId = async (id) => {
  try {
    const sql = 'SELECT * FROM SYMPTOMS WHERE symptom_id=?';
    const params = [id];
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
  try {
    const rows = await promisePool.query(sql, params);  
    return {entry_id: rows[0].insertId};   
  } catch (error) {
    console.error('[Model] addSymptoms: ', error.message);
    return {error: error.message}; 
  }
};

export {
  listAllSymptoms,
  listSymptomsByUserId,
  listSymptomsBySymptomId,
  addSymptoms
}; 
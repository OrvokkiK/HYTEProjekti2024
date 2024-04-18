// symptom-controller.mjs
import { listAllSymptoms, listSymptomsByUserId, listSymptomsBySymptomId, addSymptoms, updateEntryById, deleteSymptomById } from "../models/symptom-models.mjs";
import promisePool from "../utils/database.mjs";

//Get all symptoms
const getAllSymptoms = async (req, res) => {
  const result = await listAllSymptoms();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};


//GET all symptoms by user a specific user
const getSymptomsByUserId = async (req, res) => {
  const user_id = req.params.id;
  console.log('controller, getSymptomsbyuserId')
  const result = await listSymptomsByUserId(user_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

//GET a symptom entry by symptom id
const getSymptomsBySymptomId = async (req,res) => {
  const symptom_id = req.params.id;
  console.log(symptom_id);
  const result = await listSymptomsBySymptomId(symptom_id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

//POST New entry
const postNewEntry = async(req,res) => {
  const user_id = req.params.id
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
    stress_level} = req.body;
  if (entry_date && user_id && stress_level) {
    const result = await addSymptoms(req.body, user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    res.json(result);
  } else {
    return res.status(404).json({error: 400, message: 'bad request'});
  }
};

// PUT (edit) an entry by entry_id
const putEntryById = async (req, res) => {
  const symptom_id = req.params.id
  const {
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
    user_id} = req.body;
  if ( user_id && stress_level) {
    const entry = { 
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
      user_id,
      symptom_id
    }
    // console.log('Controller ', entry);
    const result = await updateEntryById(entry);
    //console.log(result);

    /*if (result.changedRows === 1) {
      return {message: `Entry ${symptom_id} updated`};
    }*/
    if (result.error) {
      return res.status(500).json(result); 
    } else {
      return res.status(200).json({message: 'data in symptoms is updated'});
    }
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const removeSymptomById = async (req, res) => {
  const result = await deleteSymptomById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {
  getAllSymptoms,
  getSymptomsByUserId,
  getSymptomsBySymptomId,
  postNewEntry,
  putEntryById,
  removeSymptomById
};

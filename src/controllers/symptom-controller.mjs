// symptom-controller.mjs
import { listAllSymptoms, listSymptomsByUserId, listSymptomsBySymptomId, addSymptoms, updateEntryById, deleteSymptomById } from "../models/symptom-models.mjs";
import promisePool from "../utils/database.mjs";

//Get all symptoms
const getAllSymptoms = async (req, res) => {
  const user_level = req.user.user_level;
  if (user_level === 'admin' || user_level === 'hcp') {
    const result = await listAllSymptoms();
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};


//GET all symptoms by a specific user
const getSymptomsByUserId = async (req, res) => {
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const user_id = req.params.id;
  if (user_id_token == user_id || user_level === 'admin' || user_level === 'hcp') {
    const result = await listSymptomsByUserId(user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  }
  return res.status(403).json({error: 403, message: 'Forbidden'});
};

//GET a symptom entry by symptom id
const getSymptomsBySymptomId = async (req,res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  const user_id_token = req.user.userId;
  console.log(user_id_token);
  const user_level = req.user.user_level;
  const symptom_id = req.params.id;
  console.log(symptom_id);
  if (user_id == user_id_token ||user_level === 'hcp' || user_level === 'admin') {
    const result = await listSymptomsBySymptomId(symptom_id, user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

//POST New entry
const postNewEntry = async(req,res) => {
  const user_id = req.user.userId;
  console.log(user_id);
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
    if (entry_date && user_id && stress_level 
      && frustration && grumpiness && recall_problems 
      && restlesness && disquiet && tiredness && anxiety 
      && anxiety && difficulty_making_decisions && 
      sleep_disturbances && changes_in_appetite && 
      headache && neck_pain && vertigo && palpitation 
      && nausea && upset_stomach && recurring_colds 
      && back_issues) {
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
  const user_id_token = req.user.userId;
  const symptom_id = req.params.id;
  const user_level = req.user.user_level; 
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
  if (user_id_token == user_id || user_level === 'admin') {
    if ( user_id && stress_level && frustration && grumpiness && recall_problems 
      && restlesness && disquiet && tiredness && anxiety 
      && anxiety && difficulty_making_decisions && 
      sleep_disturbances && changes_in_appetite && 
      headache && neck_pain && vertigo && palpitation 
      && nausea && upset_stomach && recurring_colds 
      && back_issues ) {
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
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'});
  }
};

const removeSymptomById = async (req, res) => {
  const user_id = req.params.user_id;
  const user_id_token = req.user.userId;
  const user_level = req.user.user_level;
  const symptom_id = req.params.id;
  if (user_id == user_id_token || user_level === 'admin') {
    const result = await deleteSymptomById(symptom_id, user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } else {
    return res.status(403).json({error: 403, message: 'Forbidden'}); 
  }
};

export {
  getAllSymptoms,
  getSymptomsByUserId,
  getSymptomsBySymptomId,
  postNewEntry,
  putEntryById,
  removeSymptomById
};

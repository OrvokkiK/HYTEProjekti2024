// symptom-router.mjs
import express from "express";
import {
  getAllSymptoms,
  getSymptomsBySymptomId,
  getSymptomsByUserId,
  postNewEntry,
  putEntryById,
  removeSymptomById,
} from "../controllers/symptom-controller.mjs";

const symptomRouter = express.Router();

// Symptom endppoints
symptomRouter.route("/").get(getAllSymptoms); // Move to admin router?

// TODO: figureout routing for getSymptomsByUserId

//symptom/:id endpoints
symptomRouter
  .route("/:id")
  .get(getSymptomsBySymptomId)
  .post(postNewEntry)
  .put(putEntryById)
  .delete(removeSymptomById);

export default symptomRouter;

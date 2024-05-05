import express from "express";
import { body, param } from "express-validator";
import { getLifestyleDataByUserId, postEntry } from "../controllers/lifestyle-controller.mjs";
import { validationErrorHandler } from "../middlewares/error-handler.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const lifestyleRouter = express.Router();

lifestyleRouter.route("/").post(authenticateToken, postEntry);

lifestyleRouter.route("/:id").get(authenticateToken, getLifestyleDataByUserId);

export default lifestyleRouter;

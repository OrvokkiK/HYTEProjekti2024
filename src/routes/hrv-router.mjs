import express from "express";
import { body, param } from "express-validator";
import { postHrv } from "../controllers/hrv-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const hrvRouter = express.Router();

hrvRouter.route(':/id').post(authenticateToken, postHrv);

export default hrvRouter;
import express from "express";
import { body, param } from "express-validator";
import { getLifestyleDataByUserId, postEntry } from "../controllers/lifestyle-controller.mjs";
import { validationErrorHandler } from "../middlewares/error-handler.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const lifestyleRouter = express.Router();

lifestyleRouter.post('/',
    body('entry_date').isDate(),
    body('hours_slept').isNumeric({no_symbols:true}),
    body('enough_sleep').isIn(['Kyllä', 'Ei', 'kyllä', 'ei', 'KYLLÄ', 'EI', 'Yes', 'No', 'yes', 'no', 'YES', 'NO' ]),
    body('quality_sleep').isInt({min:1, max:5}),
    body('feel_healthy').isIn(['Kyllä', 'Ei', 'kyllä', 'ei', 'KYLLÄ', 'EI', 'Yes', 'No', 'yes', 'no', 'YES', 'NO' ]),
    body('caffeine_intake').isNumeric({no_symbols:true}),
    body('nicotine_intake').isNumeric({no_symbols:true}),
    body('alcohol_intake').isNumeric({no_symbols:true}),
    body('physical_activity').isIn(['Kyllä', 'Ei', 'kyllä', 'ei', 'KYLLÄ', 'EI', 'Yes', 'No', 'yes', 'no', 'YES', 'NO' ]),
    body('duration').isNumeric({no_symbols:true}).optional({ nullable: true }),
    body('intensity').isNumeric({no_symbols:true}).optional({ nullable: true }),
    body('user_id').isInt(),
    validationErrorHandler, 
    authenticateToken, postEntry);

lifestyleRouter.route("/:id").get(authenticateToken, getLifestyleDataByUserId);

export default lifestyleRouter;

import express from "express";

import { login, register } from "../controllers/Auth.controller";
import { validateBody } from "../middlewares/Validation.middleware";
import { loginBodySchema, registerBodySchema } from "../utils/validations/Auth.validation";

const router = express.Router();

router.get('/', validateBody(loginBodySchema), login);
router.post('/', validateBody(registerBodySchema), register);

export default router
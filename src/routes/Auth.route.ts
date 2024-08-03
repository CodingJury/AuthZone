import express from "express";

import { login, register } from "../controllers/Auth.controller";
import { validateBody } from "../middlewares/Validation.middleware";
import { registerBodySchema } from "../utils/validations/Auth.validation";

const router = express.Router();

router.get('/', login);
router.post('/', validateBody(registerBodySchema), register);

export default router
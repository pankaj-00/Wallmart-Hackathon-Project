import { Router } from "express";

import convAI from "./convai.controller";

const convAIrouter = Router();

convAIrouter.post('/', convAI);

export default convAIrouter;
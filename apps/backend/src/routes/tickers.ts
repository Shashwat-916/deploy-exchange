

import { Router } from 'express';
import { GetTickers } from '../controller/ticker.js';


export const tickersRouter: Router = Router();

tickersRouter.get("/", GetTickers);

export default tickersRouter
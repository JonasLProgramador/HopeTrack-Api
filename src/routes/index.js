import {Router} from 'express';
import { donatorRouter } from './donator.routes.js';

const router = Router()

router.use('/donator',donatorRouter);




export { router }
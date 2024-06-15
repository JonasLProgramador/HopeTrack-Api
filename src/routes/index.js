import {Router} from 'express';
import { routesExample } from './user.routes.js';

const router = Router()

router.use('/rota',routesExample);




export { router }
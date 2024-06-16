import {Router} from 'express';
import { donatorRouter } from './donator.Routes.js';
import { donationRouter } from './donation.Routes.js';

const router = Router()

router.use('/donator',donatorRouter);

router.use('/donation',donationRouter);




export { router }
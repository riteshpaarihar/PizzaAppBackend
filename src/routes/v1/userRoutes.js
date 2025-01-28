import express from 'express';
import { createUser } from '../../controllers/userController.js';

const routes = express.Router();
routes.post('/create', createUser);
export default routes;
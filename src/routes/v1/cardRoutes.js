import express from 'express';
import getCardById from '../../controllers/cardController.js';

const routes = express.Router();

routes.get('/:id', getCardById)

export default routes;
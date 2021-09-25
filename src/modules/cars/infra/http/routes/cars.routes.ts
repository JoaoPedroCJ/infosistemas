import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CarsController from '../controllers/CarsController';

const carsRouter = Router();

const carsController = new CarsController();

carsRouter.use(ensureAuthenticated);

carsRouter.get('/', carsController.show);
carsRouter.get('/search', carsController.show);
carsRouter.get('/list', carsController.show);
carsRouter.get('/:id', carsController.show);

carsRouter.post('/', carsController.show);

carsRouter.put('/:id', carsController.show);

carsRouter.delete('/:id', carsController.show);

export default carsRouter;

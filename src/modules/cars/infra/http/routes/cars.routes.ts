import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import isAdmin from '@modules/users/infra/http/middlewares/isAdmin';
import CarsController from '../controllers/CarsController';

const carsRouter = Router();

const carsController = new CarsController();

carsRouter.use(ensureAuthenticated);

carsRouter.get('/', carsController.list);
carsRouter.get('/placa/:placa', carsController.findPlaca);
carsRouter.get('/chassi/:chassi', carsController.findChassi);
carsRouter.get('/renavam/:renavam', carsController.findRenavam);
carsRouter.get('/:id', carsController.show);

carsRouter.post('/', isAdmin, carsController.create);

carsRouter.put('/:id', isAdmin, carsController.update);

carsRouter.delete('/:id', isAdmin, carsController.remove);

export default carsRouter;

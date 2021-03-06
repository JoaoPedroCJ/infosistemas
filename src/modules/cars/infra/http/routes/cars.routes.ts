import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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

carsRouter.post(
  '/',
  isAdmin,
  celebrate({
    [Segments.BODY]: {
      ano: Joi.string().required(),
      chassi: Joi.string().required(),
      marca: Joi.string().required(),
      modelo: Joi.string().required(),
      placa: Joi.string().required(),
      renavam: Joi.string().required(),
    },
  }),
  carsController.create,
);

carsRouter.put('/:id', isAdmin, carsController.update);

carsRouter.delete(
  '/:id',
  isAdmin,
  celebrate({
    [Segments.BODY]: {
      placa: Joi.string().required(),
    },
  }),
  carsController.remove,
);

export default carsRouter;

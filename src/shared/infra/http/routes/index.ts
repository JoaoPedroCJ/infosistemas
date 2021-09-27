import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '@docs/swagger.json';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';

const routes = Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cars', carsRouter);
routes.use('/me', profileRouter);

routes.use(function (req, res) {
  return res.status(404).json({
    message: 'Rota não encontrada.',
  });
});

export default routes;

import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import { errors } from 'celebrate';

import ErrorHandler from '@shared/errors/ErrorHandler';
import rateLimiter from './middlewares/rateLimiter';

import routes from './routes';

const {
  NODE_ENV = 'development',
  APP_ADDRESS = 'http://localhost',
  APP_PORT = 3333,
} = process.env;

const server = express();

server.use(cors());
server.use(express.json());
server.use(rateLimiter);

server.use(routes);

server.use(errors());

server.use(ErrorHandler);

server.listen(APP_PORT, () => {
  console.info(
    `\n[Server]: Started on \x1b[36m${APP_ADDRESS}:${APP_PORT}\x1b[0m\x1b[0m`,
  );
  console.info(`[Environment]: \x1b[36m${NODE_ENV}\x1b[0m\x1b[0m`);
  if (NODE_ENV === 'development') {
    console.info(
      `[Documentation]: \x1b[36m${APP_ADDRESS}:${APP_PORT}/api-docs\x1b[0m\x1b[0m\n`,
    );
  }
});

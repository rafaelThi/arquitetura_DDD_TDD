import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import upLoadConfig from '@config/upload';

import '@shared/infra/typeorm/index';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/container/index';

const app = express();
//
app.use(cors());
app.use(express.json());
app.use('/files', express.static(upLoadConfig.uploadsFolder));
app.use(routes);
//

app.use((err: Error, request: Request, response:Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      messagege: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    messagege: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server ON -Code 200-');
});

import { IncomingMessage, ServerResponse } from 'http';

import './routes/users';
import responseBuilder from './utils/responseBuilder';

import emitter from './utils/eventEmitter';

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method, url } = req;

    if (url) {
      const pathFull = url.split('/').slice(1);
      const [path] = pathFull;

      if (pathFull.length >= 3) {
        responseBuilder({
          res,
          code: 404,
          message: 'Sorry here only one layer nest\n',
        });
      } else {
        const emitted = emitter.emit(`[${path}]:[${method}]`, req, res);
        if (!emitted) {
          responseBuilder({
            res,
            code: 404,
            message: 'no such endpoint\n',
          });
        }
      }
    }
  } catch (error) {
    responseBuilder({
      res,
      code: 500,
      message: 'Sorry, internal server error has occured',
    });
  }
};

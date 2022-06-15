import { IncomingMessage, ServerResponse } from 'http';

import emitter from '../../utils/eventEmitter';

interface IHandler {
  (req: IncomingMessage, res: ServerResponse): void;
}

export class Router {
  endpoints: Record<string, Record<string, IHandler>>;

  constructor() {
    this.endpoints = {};
  }

  request({ method = 'GET', path, handler }: { method: string; path: string; handler: IHandler }) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (!endpoint || endpoint[method]) {
      throw new Error(`no such endpoint`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse) => {
      handler(req, res);
    });
  }

  get(path: string, handler: IHandler) {
    this.request({ method: 'GET', path, handler });
  }

  post(path: string, handler: IHandler) {
    this.request({ method: 'POST', path, handler });
  }

  put(path: string, handler: IHandler) {
    this.request({ method: 'PUT', path, handler });
  }

  delete(path: string, handler: IHandler) {
    this.request({ method: 'DELETE', path, handler });
  }
}

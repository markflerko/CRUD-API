import { IncomingMessage } from 'http';

interface RequestWithBody extends IncomingMessage {
  body?: string;
}

export const bodyParser = <T>(req: RequestWithBody) =>
  new Promise<T>((res, rej) => {
    let chunks = '';

    req.on('error', (err: Error) => {
      console.log('error happened while body parsing', err);
      rej(err);
    });

    req.on('data', (chunk: string) => {
      chunks += chunk;
    });

    req.on('end', () => {
      req['body'] = chunks;
      res(JSON.parse(chunks));
    });
  });

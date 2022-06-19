import cluster from 'cluster';
import dotenv from 'dotenv';
import http, { IncomingMessage, ServerResponse } from 'http';
import os from 'os';
import requestListener from './requestListener';

dotenv.config();

const PORT = process.env.PORT;
const pid = process.pid;

if (cluster.isPrimary) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i += 1) cluster.fork();
} else {
  const id = cluster?.worker?.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);

  const hoc = async (req: IncomingMessage, res: ServerResponse) => {
    return requestListener(req, res, pid);
  };

  const app = http.createServer(hoc);

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}

process.on('uncaughtException', (error) => {
  console.log(`captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: { message: string }) => {
  console.log(`Unhandled rejection detected: ${reason.message}`);
});

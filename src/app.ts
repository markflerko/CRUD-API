import http from 'http';
import requestListener from './requestListener';

const app = http.createServer(requestListener);

process.on('uncaughtException', (error) => {
  console.log(`captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: { message: string }) => {
  console.log(`Unhandled rejection detected: ${reason.message}`);
});

export default app;

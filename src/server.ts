import http from 'http';
import dotenv from 'dotenv';
import requestListener from './requestListener';

dotenv.config();

const PORT = process.env.PORT;

export const app = http.createServer(requestListener);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', (error) => {
  console.log(`captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: { message: string }) => {
  console.log(`Unhandled rejection detected: ${reason.message}`);
});

export default app;

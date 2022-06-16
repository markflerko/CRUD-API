import { IncomingMessage } from 'http';

export const getIdFromReq = (req: IncomingMessage) => {
  let id1;
  let pathIdPath;
  let id2;
  if (req.url) {
    const pathFull = req.url.split('/').slice(1);
    [, id1, pathIdPath, id2] = pathFull;
  }

  id1 = id1 || '';
  id2 = id2 || '';
  pathIdPath = pathIdPath || '';

  return pathIdPath === 'tasks' ? id2 : id1;
};

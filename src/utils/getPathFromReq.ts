import { IncomingMessage } from 'http';

/**
 * Parse request in order to get id from path
 * @param req request stream from client
 * @returns id from path
 */
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

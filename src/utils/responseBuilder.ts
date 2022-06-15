import { ServerResponse } from 'http';

/**
 * close response stream
 * @param config.res response stream that send to client as a result of request handling
 * @param config.code http status code to notify client about result of request
 * @param config.body body of response in json format
 * @param config.message user-friendly message about request result
 */
export const responseBuilder = ({
  res,
  code,
  body = '',
  message = '',
}: {
  res: ServerResponse;
  code: number;
  body?: string | object;
  message?: string;
}) => {
  if (body) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(body));
  } else {
    res.statusCode = code;
  }

  if (message) {
    res.write(message);
  }

  res.end();
};

export default responseBuilder;

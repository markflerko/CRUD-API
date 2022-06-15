import { IncomingMessage, ServerResponse } from 'http';
import checkFieldsInObj from '../utils/checkFieldsInObj';
import { IUser } from '../models/User';
import { usersRepository } from '../repository/database';
import createUser from '../services/users/createUser';
import deleteUser from '../services/users/deleteUser';
import readUser from '../services/users/readUser';
import readUsers from '../services/users/readUsers';
import updateUser from '../services/users/updateUser';
import { bodyParser } from '../utils/bodyParser';
import { getIdFromReq } from '../utils/getPathFromReq';
import { isUuid } from '../utils/isUuid';
import { responseBuilder } from '../utils/responseBuilder';
import { Router } from './Router';

const router = new Router();

const postHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const data = await bodyParser<IUser>(req);

  const doesBodyHasFields = checkFieldsInObj(data, 'username', 'age');

  if (!doesBodyHasFields || !Array.isArray(data.hobbies)) {
    responseBuilder({
      res,
      code: 400,
      message: `You didn't provide one of required fields, please check username: ${
        data.username
      } age: ${data.age} hobbies: ${JSON.stringify(data.hobbies)}\n`,
    });
  } else {
    const person = createUser({ data });
    responseBuilder({ res, code: 201, body: person });
  }
};

router.post('users', postHandler);

const getHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getIdFromReq(req);
  const haveId = usersRepository.some((item) => item.id === id);

  if (!id) {
    const users = readUsers();
    responseBuilder({ res, code: 200, body: users });
  } else if (!isUuid(id)) {
    responseBuilder({
      res,
      code: 400,
      message: `Sorry but id: ${id} doesnt match uuid format \n`,
    });
  } else if (!haveId) {
    responseBuilder({
      res,
      code: 404,
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const user = readUser(id);

    responseBuilder({
      res,
      code: 200,
      body: user,
    });
  }
};

router.get('users', getHandler);

const putHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getIdFromReq(req);

  const data = await bodyParser<IUser>(req);

  const haveId = usersRepository.some((item) => item.id === id);

  if (!isUuid(id)) {
    responseBuilder({
      res,
      code: 400,
      message: `Sorry but id: ${id} doesnt match uuid format \n`,
    });
  } else if (!haveId) {
    responseBuilder({
      res,
      code: 404,
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const updatedPerson = updateUser({ id, body: data });
    responseBuilder({ res, code: 200, body: updatedPerson });
  }
};

router.put('users', putHandler);

const deleteHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getIdFromReq(req);
  const haveId = usersRepository.some((item) => item.id === id);

  if (!isUuid(id)) {
    responseBuilder({
      res,
      code: 400,
      message: `Sorry but id: ${id} doesnt match uuid format \n`,
    });
  } else if (!haveId) {
    responseBuilder({
      res,
      code: 404,
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const isUserDeleted = deleteUser(id);
    if (isUserDeleted) {
      responseBuilder({ res, code: 204 });
    }
  }
};

router.delete('users', deleteHandler);

export default router;

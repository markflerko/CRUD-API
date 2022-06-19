import { v4 as uuidv4 } from 'uuid';
import { IUser, User } from '../../models/User';
import { usersRepository } from '../../repository/database';

const createUser = ({ data }: { data: IUser }): IUser => {
  const id = uuidv4();
  const user = new User({ ...data, id });
  usersRepository.push(user);
  return user;
};

export default createUser;

import { IUser } from '../../models/User';
import { usersRepository } from '../../repository/database';

const readUsers = (): IUser[] => usersRepository;

export default readUsers;

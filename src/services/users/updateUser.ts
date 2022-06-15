import { usersRepository } from '../../repository/database';
import { IUser } from '../../models/User';

const updatePerson = ({ id, body }: { id: string; body: IUser }): IUser | undefined => {
  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository[index] = {
    ...usersRepository[index],
    ...body,
  };

  return usersRepository[index];
};

export default updatePerson;

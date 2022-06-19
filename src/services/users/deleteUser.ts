import { usersRepository } from '../../repository/database';

const deleteUser = (id: string): boolean => {
  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository.splice(index, 1);
  return usersRepository.findIndex((item) => item.id === id) === -1;
};

export default deleteUser;

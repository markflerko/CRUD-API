import { usersRepository } from '../../repository/database';

const readUser = (
  id: string
): { id?: string; name?: string; login?: string } | undefined => {
  const user = usersRepository.find((item) => item.id === id);
  return user;
};

export default readUser;

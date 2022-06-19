import { IUser } from '../models/User';

export const checkFieldsInObj = (data: IUser, ...args: string[]): boolean => {
  let result = true;

  args.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(data, field)) {
      result = false;
    }
  });

  return result;
};

export default checkFieldsInObj;

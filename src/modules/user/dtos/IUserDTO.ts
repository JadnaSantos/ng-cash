import { Decimal } from '@prisma/client/runtime';

interface IUser {
  id?: string;
  username: string;
  password: string;
  accountId?: string;

  account?: {
    id: string
    balance: Decimal
  }

}

export { IUser };

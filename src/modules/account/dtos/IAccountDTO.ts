import { Decimal } from '@prisma/client/runtime';

interface IAccount {
  id: number,
  balance?: Decimal,
}

export { IAccount };

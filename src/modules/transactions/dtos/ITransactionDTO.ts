import { Decimal } from '@prisma/client/runtime';

interface ITransaction {
  id: number;
  debitedAccountId?: number;
  creditedAccountId?: number;
  value?: Decimal;
  createdAt?: Date;
}

export { ITransaction };

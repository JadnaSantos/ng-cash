import { Decimal } from '@prisma/client/runtime';

interface ITransactionDTO {
  id?: number,
  value: Decimal,
  created_at: Date,
  debitedAccountId?: string,
  creditedAccountId?: string,
}


export { ITransactionDTO };

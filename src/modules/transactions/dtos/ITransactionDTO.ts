import { Decimal } from '@prisma/client/runtime';

interface ITransactionDTO {
  id: string;
  value: Decimal,
  created_at: Date,
  debitedAccountId?: string,
  creditedAccountId?: string,
}


export { ITransactionDTO };

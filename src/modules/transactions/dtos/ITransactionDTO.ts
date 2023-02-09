import { Decimal } from '@prisma/client/runtime';

class ITransaction {
  id?: string;
  debitedAccountId?: number;
  creditedAccountId?: number;
  accountId?: number;
  date?: Date;
  value?: Decimal;
  private constructor({ debitedAccountId, creditedAccountId, accountId, date, value }: ITransaction) {
    return Object.assign(this, {
      debitedAccountId,
      creditedAccountId,
      accountId,
      date,
      value,
    });
  }

  static create({ debitedAccountId, creditedAccountId, accountId, date, value }: ITransaction) {
    const transaction = new ITransaction({ debitedAccountId, creditedAccountId, accountId, date, value });
    return transaction;
  }
}

export { ITransaction };

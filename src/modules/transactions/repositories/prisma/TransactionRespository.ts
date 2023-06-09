import { Transactions } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { ICreateTransaction, ITransactionRepository } from '../interface/ITransactionRespository';

class TransactionRepository implements ITransactionRepository {
  async createTransaction(debitedAccountId: number, creditedAccountId: number, value: number): Promise<Transactions> {
    const transaction = await prisma.transactions.create({
      data: {
        value,
        debitedAccountId,
        creditedAccountId
      }
    });

    return transaction;
  }
}

export { TransactionRepository };

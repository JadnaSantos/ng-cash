import { Transactions } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { ITransaction } from '../../dtos/ITransactionDTO';
import { ITransactionRepository } from '../interface/ITransactionRespository';


class TransactionRepository implements ITransactionRepository {
  async create(data: ITransaction): Promise<Transactions> {
    const transaction = await prisma.transactions.create({
      data: {
        creditedAccountId: data.creditedAccountId,
        debitedAccountId: data.debitedAccountId,
        value: data.value,
      }
    });

    return transaction;
  }


  async filterCredited(data: ITransaction): Promise<Transactions[]> {
    const filter = await prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: data.date
        },
        creditedAccountId: data.accountId
      }
    });

    return filter as Transactions[];
  }


  async filterDebited(user: ITransaction): Promise<Transactions[]> {
    const filter = await prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: user.date
        },
        creditedAccountId: user.accountId
      }
    });

    return filter as Transactions[];
  }


  async credited(user: ITransaction): Promise<Transactions[]> {
    const filter = await prisma.transactions.findMany({
      where: {
        id: user.accountId
      }
    });

    return filter as Transactions[];
  }

  async debited(user: ITransaction): Promise<Transactions[]> {
    const filter = await prisma.transactions.findMany({
      where: {
        id: user.accountId
      }
    });

    return filter as Transactions[];
  }
}

export { TransactionRepository };

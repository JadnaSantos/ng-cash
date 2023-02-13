import { Transactions } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { ITransaction } from '../../dtos/ITransactionDTO';
import { ITransactionRepository } from '../interface/ITransactionRespository';

class TransactionRepository implements ITransactionRepository {
  async getAllTransactions(id: number): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            creditedAccountId: id
          },
          {
            debitedAccountId: id
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }

    });

    return transactions as Transactions[];
  }

  async getDebitedTransactions(id: number): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        debitedAccountId: id
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
        creditedAccount: {
          select: {
            Users: {
              select: {
                username: true,
              },
            },
          },
        },
        debitedAccount: {
          select: {
            Users: {
              select: {
                username: true
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    return transactions as Transactions[];
  }

  async findManyByDateRange(id: number, from: string, to: string): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        createdAt: {
          lte: new Date(to),
          gte: new Date(from)
        },
        OR: [
          {
            creditedAccountId: id
          },
          {
            debitedAccountId: id
          }
        ]
      }
    });

    return transactions as Transactions[];
  }


  async getCreditedTransactions(id: number): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: id
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
        creditedAccount: {
          select: {
            Users: {
              select: {
                username: true,
              },
            },
          },
        },
        debitedAccount: {
          select: {
            Users: {
              select: {
                username: true
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' }
    });

    return transactions as Transactions[];
  }

  async createTransaction(data: ITransaction): Promise<Transactions> {
    const transaction = await prisma.transactions.create({
      data: {
        id: Number(data.id),
        debitedAccountId: Number(data.debitedAccountId),
        creditedAccountId: Number(data.creditedAccountId),
        value: Number(data.value)
      },
    });


    return transaction as Transactions;
  }


}

export { TransactionRepository };

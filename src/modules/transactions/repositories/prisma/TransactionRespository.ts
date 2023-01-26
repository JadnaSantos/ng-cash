import { Accounts, Transactions } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { ITransactionRepository } from '../interface/ITransactionRespository';

class TransactionRepository implements ITransactionRepository {
  async findAllTransactions({ id }: ITransactionDTO): Promise<Transactions[]> {
    const allTransations = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: Number(id),
            creditedAccountId: Number(id)
          }
        ],
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
      }
    });

    return allTransations;
  }

  async findManyByCashOut({ id }: ITransactionDTO): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        debitedAccountId: id
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        debitedAccountId: true,
        creditedAccountId: true,
        createdAt: true,
      }
    });

    return transactions;
  }


  async findManyByCashIn({ id }: ITransactionDTO): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: id
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        value: true,
        debitedAccountId: true,
        creditedAccountId: true,
        createdAt: true,
      }
    });

    return transactions;
  }

  async findManyByDateRange(id: string, from: string, to: string): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        createdAt: {
          lte: new Date(to),
          gte: new Date(from)
        },
        OR: [
          { creditedAccountId: Number(id) },
          { debitedAccountId: Number(id) }
        ]
      }
    });

    return transactions;
  }

  // async create({ id, creditedAccountId, debitedAccountId, value }: ITransactionDTO): Promise<Transactions> {
  //   const transactions = await prisma.transactions.create({
  //     data: {
  //       id,
  //       debitedAccountId: Number(debitedAccountId),
  //       creditedAccountId: Number(creditedAccountId),
  //       value
  //     }
  //   });

  //   return transactions;
  // }



  async create({ id, creditedAccountId, debitedAccountId, value }: ITransactionDTO) {
    const transaction = await prisma.$transaction([
      prisma.accounts.update({
        data: {
          balance: value,
        },
        where: {
          id
        }
      }),
      prisma.accounts.update({
        data: {
          balance: value,
        },
        where: {
          id
        }
      }),
      prisma.transactions.create({
        data: {
          debitedAccountId: Number(debitedAccountId),
          creditedAccountId: Number(creditedAccountId),
          value
        },
      })
    ]);

    return transaction;
  }
}

export { TransactionRepository };

import dayjs from 'dayjs';
import { Transactions } from '@prisma/client';

import { prisma } from '../../../../shared/infra/database';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { ITransactionRepository } from '../interface/ITransactionRespository';

class TransactionRepository implements ITransactionRepository {
  async createTransaction(data: ITransactionDTO) {
    await prisma.$transaction([
      prisma.accounts.update({
        where: { id: Number(data.debitedAccountId) },
        data: { balance: { decrement: data.value } },
      }),
      prisma.accounts.update({
        where: {
          id: Number(data.creditedAccountId)
        },
        data: {
          balance: {
            increment: data.value,
          },
        },
      }),
      prisma.transactions.create({
        data: {
          id: Number(data.id),
          debitedAccountId: Number(data.debitedAccountId),
          creditedAccountId: Number(data.creditedAccountId),
          value: data.value
        },
      }),
    ]);
  }

  async getAllTransactions(userId: number, date: string, type: string) {
    const filters: any = {
      where: {}
    };

    type === 'cash-in'
      ? (filters.where.creditedAccountId = userId)
      : type === 'cash-out'
        ? (filters.where.debitedAccountId = userId)
        : (filters.where.OR = [
          { creditedAccountId: userId },
          { debitedAccountId: userId },
        ]);


    const formatedDate = dayjs(date).format();

    if (formatedDate !== 'Invalid Date' && date) {
      const dayAfter = dayjs(formatedDate).add(1, 'day').format();

      filters.where.createdAt = { gte: formatedDate, lt: dayAfter };
    }


    const transaction = await prisma.transactions.findMany({
      where: filters.where,

      select: {
        debitedAccount: {
          select: {
            Users: {
              select: {
                username: true
              }
            }
          }
        },
        creditedAccount: {
          select: {
            Users: {
              select: {
                username: true
              }
            }
          }
        },
        value: true,
        createdAt: true,
      }
    });


    return transaction;
  }
}

export { TransactionRepository };

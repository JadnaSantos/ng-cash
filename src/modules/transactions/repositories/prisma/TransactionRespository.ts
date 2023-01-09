import { Accounts, Transactions } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { prisma } from '../../../../shared/infra/database';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { ITransaction } from '../interface/ITransactionRespository';

class Transaction implements ITransaction {
  async create(
    id: number,
    debitedAccountId: number,
    creditedAccountId: number,
    value: number
  ): Promise<Transactions> {
    const transaction = await prisma.transactions.create({
      data: {
        id: Number(id),
        creditedAccountId,
        debitedAccountId,
        value
      }
    });

    return transaction;
  }


  async findByAccountId(id: number): Promise<Transactions[]> {
    const transaction = await prisma.transactions.findMany({
      where: {
        OR: [
          { debitedAccountId: id },
          { creditedAccountId: id },
        ]
      }
    });

    return transaction;
  }

  async findByCashIn(id: number): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: id
      }
    });

    return transactions;
  }

  async findByCashOut(id: number, from: string, to: string): Promise<Transactions[]> {
    const transactions = await prisma.transactions.findMany({
      where: {
        createdAt: {
          lte: new Date(to),
          gte: new Date(from)
        },
        OR: [
          { debitedAccountId: id },
          { creditedAccountId: id },
        ]
      }
    });

    return transactions;
  }

  async updateBalance(id: number, value: number, isChashIn: boolean): Promise<Accounts> {
    if (value < 0 || value == 0) {
      throw new AppError('value must be highier then 0');
    }

    const account: Accounts | null = await prisma.accounts.findUnique({ where: { id } });

    if (!account) {
      throw new AppError('Could not find a account!');
    }

    const balance = account.balance;
    let newBalance: Decimal;

    if (balance.lessThan(value)) {
      throw new AppError('Insuficient funds!');
    }

    if (isChashIn) {
      newBalance = Decimal.sum(balance, value);
    } else {
      newBalance = Decimal.sum(balance, value * -1);
    }

    const result: Accounts = await prisma.accounts.update({
      where: { id },
      data: {
        balance: newBalance
      }
    });

    return result;
  }
}

export { Transaction };

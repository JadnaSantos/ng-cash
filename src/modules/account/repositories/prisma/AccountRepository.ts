import { Accounts } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { prisma } from '../../../../shared/infra/database';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUser } from '../../../user/dtos/IUserDTO';
import { IAccount } from '../../dtos/IAccountDTO';
import { IAccountRepository } from '../interface/IAccountRepository';


class AccountRepository implements IAccountRepository {
  async findAccountById(id: number): Promise<Accounts> {
    const account = await prisma.accounts.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        balance: true,
        Users: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    return account as Accounts;
  }

  // async findUserById(id: number): Promise<Accounts> {
  //   const accountId = await prisma.users.findUnique({
  //     where: { id }
  //   }) as IUser | null;

  //   if (!accountId) {
  //     throw new AppError('User does not exist');
  //   }

  //   const account: IAccount | null = await prisma.accounts.findUnique({
  //     where: { id: accountId.accountId }
  //   });

  //   if (!account) {
  //     throw new AppError('Account does not exist');
  //   }


  //   return account;
  // }


  async updateBalance(id: number, value: number, isChashIn: boolean): Promise<Accounts> {
    if (value < 0 || value == 0) {
      throw new Error('value must be highier then 0');
    }

    const account = await prisma.accounts.findUnique({ where: { id } });

    if (!account) {
      throw new Error('Could not find a account');
    }

    const balance = account.balance;
    let newBalance: Decimal;

    if (balance.lessThan(value)) {
      throw new Error('Insuficient funds');
    }

    if (isChashIn) {
      newBalance = Decimal.sum(balance, value);
    } else {
      newBalance = Decimal.sum(balance, value * -1);
    }

    const result = await prisma.accounts.update({
      where: { id },
      data: {
        balance: newBalance
      }
    });

    return result;
  }

}

export { AccountRepository };

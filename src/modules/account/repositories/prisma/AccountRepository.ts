import { Accounts } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IAccount } from '../../dtos/IAccountDTO';
import { IAccountRepository } from '../interface/IAccountRepository';

class AccountRepository implements IAccountRepository {
  async findAccountById({ id }: IAccount): Promise<Accounts> {
    const account = await prisma.accounts.findUnique({
      where: {
        id: Number(id),
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

  async findAccountByUsername(username: string): Promise<Accounts> {
    const account = await prisma.accounts.findFirst({
      where: {
        Users: {
          username: username
        }
      }
    });

    return account as Accounts;
  }

}

export { AccountRepository };

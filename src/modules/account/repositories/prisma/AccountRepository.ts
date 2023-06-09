import { Accounts } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IAccountRepository } from '../interface/IAccountRepository';


class AccountRepository implements IAccountRepository {
  async checkBalace(id: number): Promise<Accounts> {
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

  async findAccountByUsername(username: string): Promise<Accounts | null> {
    const accountByUsername = await prisma.accounts.findFirst({
      where: {
        Users: {
          username
        }
      }
    });

    return accountByUsername;
  }
}

export { AccountRepository };

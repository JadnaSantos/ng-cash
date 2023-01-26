import { Accounts } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';
import { IAccountRepository } from '../interface/IAccountRepository';

class AccountRepository implements IAccountRepository {
  async findAccountById({ id }: IAccountUserDTO): Promise<Accounts> {
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
}

export { AccountRepository };

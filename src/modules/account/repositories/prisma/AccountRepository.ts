import { Accounts } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';
import { IAccountRepository } from '../interface/IAccountRepository';

class AccountRepository implements IAccountRepository {
  async accountBalance({ id }: IAccountUserDTO): Promise<Accounts> {
    const account = await prisma.accounts.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Users: {
          select: {
            id: true,
          }
        }
      }

    });

    return account as Accounts;
  }
}

export { AccountRepository };

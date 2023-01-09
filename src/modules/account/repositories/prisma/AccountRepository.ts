import { Accounts } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IAccountRepository } from '../interface/IAccountRepository';

class AccountRepository implements IAccountRepository {
  async accountBalance(user_id: number): Promise<Accounts> {
    const account = await prisma.accounts.findUnique({
      where: {
        id: Number(user_id),
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

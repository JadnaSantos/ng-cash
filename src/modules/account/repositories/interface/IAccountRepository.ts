import { Accounts } from '@prisma/client';

interface IAccountRepository {
  accountBalance(user_id: number): Promise<Accounts>
}

export { IAccountRepository };

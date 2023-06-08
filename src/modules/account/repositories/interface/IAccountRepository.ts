import { Accounts } from '@prisma/client';

interface IAccountRepository {
  checkBalace(id: number): Promise<Accounts>;
}

export { IAccountRepository };

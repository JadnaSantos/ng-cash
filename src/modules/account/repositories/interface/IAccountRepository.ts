import { Accounts } from '@prisma/client';

interface IAccountRepository {
  checkBalace(id: number): Promise<Accounts>;
  findAccountByUsername(username: string): Promise<Accounts | null>
}

export { IAccountRepository };

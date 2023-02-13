import { Accounts } from '@prisma/client';

interface IAccountRepository {
  findAccountById(id: number): Promise<Accounts>
  updateBalance(id: number, value: number, isChashIn: boolean): Promise<Accounts>
}

export { IAccountRepository };

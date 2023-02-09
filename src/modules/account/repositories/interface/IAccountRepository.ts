import { Accounts } from '@prisma/client';
import { IAccount } from '../../dtos/IAccountDTO';

interface IAccountRepository {
  findAccountById({ id }: IAccount): Promise<Accounts>
  findAccountByUsername(username: string): Promise<Accounts>
}

export { IAccountRepository };

import { Accounts } from '@prisma/client';
import { IAccount } from '../../dtos/IAccountDTO';
import { IAccountRepository } from '../interface/IAccountRepository';


class AccountRepositoryInMemory implements IAccountRepository {
  accounts: Accounts[] = [];

  findAccountById({ id }: IAccount): Promise<Accounts> {
    const account = this.accounts.find(account => account.id === id);

    return account;
  }


  findAccountByUsername(username: string): Promise<Accounts> {
    throw new Error('Method not implemented.');
  }


}

export { AccountRepositoryInMemory };

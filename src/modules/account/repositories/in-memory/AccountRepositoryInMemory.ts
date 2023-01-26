import { Accounts } from '@prisma/client';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';
import { IAccountRepository } from '../interface/IAccountRepository';


class AccountRepositoryInMemory implements IAccountRepository {
  findAccountById({ id }: IAccountUserDTO): Promise<Accounts> {
    throw new Error('Method not implemented.');
  }

  accounts: Accounts[] = [];

  accountBalance({ id }: IAccountUserDTO): Promise<Accounts | null> {
    const account = this.accounts.find(account => account.id === id);

    return account;
  }


}

export { AccountRepositoryInMemory };

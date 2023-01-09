import { Accounts } from '@prisma/client';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';
import { IAccountRepository } from '../interface/IAccountRepository';


class AccountRepositoryInMemory implements IAccountRepository {

  accounts: Accounts[] = [];

  accountBalance({ id }: IAccountUserDTO): Promise<Accounts | null> {
    const account = this.accounts.find(account => account.id === id);

    return account;
  }


}

export { AccountRepositoryInMemory };

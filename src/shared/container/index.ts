import { container } from 'tsyringe';
import { IAccountRepository } from '../../modules/account/repositories/interface/IAccountRepository';
import { AccountRepository } from '../../modules/account/repositories/prisma/AccountRepository';
import { IUsersRepository } from '../../modules/user/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/user/repositories/prisma/UserRepository';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IAccountRepository>(
  'AccountUserRepository',
  AccountRepository
);


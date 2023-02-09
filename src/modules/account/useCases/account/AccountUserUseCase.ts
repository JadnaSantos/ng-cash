import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccount } from '../../dtos/IAccountDTO';
import { IAccountRepository } from '../../repositories/interface/IAccountRepository';

@injectable()
class AccountUserUseCase {
  constructor(
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute({ id }: IAccount) {

    const userAccount = await this.accountRepository.findAccountById({ id });

    if (!userAccount) {
      throw new AppError('Not authorized', 401);
    }

    return userAccount;
  }
}

export { AccountUserUseCase };

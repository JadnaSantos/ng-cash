import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../repositories/interface/IAccountRepository';

@injectable()
class AccountUserUseCase {
  constructor(
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute(user_id: number) {
    const userAccount = await this.accountRepository.accountBalance(user_id);

    if (!userAccount) {
      throw new AppError('Not authorized', 401);
    }

    return userAccount;
  }
}

export { AccountUserUseCase };

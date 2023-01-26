import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';
import { IAccountRepository } from '../../repositories/interface/IAccountRepository';

@injectable()
class AccountUserUseCase {
  constructor(
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute({ id }: IAccountUserDTO) {

    const userAccount = await this.accountRepository.findAccountById({ id });

    if (!userAccount) {
      throw new AppError('Not authorized', 401);
    }

    return userAccount;
  }
}

export { AccountUserUseCase };

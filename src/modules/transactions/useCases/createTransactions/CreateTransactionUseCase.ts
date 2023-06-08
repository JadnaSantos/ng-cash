import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ITransactionRepository } from '../../repositories/interface/ITransactionRespository';
import { ITransaction } from '../../dtos/ITransactionDTO';
import { IUsersRepository } from '../../../user/repositories/interfaces/IUserRepository';
import { Transactions } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute(data: ITransaction): Promise<Transactions> {



  }

}

export { CreateTransactionUseCase };

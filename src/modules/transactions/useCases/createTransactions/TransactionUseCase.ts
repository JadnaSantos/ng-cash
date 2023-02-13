import { inject, injectable } from 'tsyringe';
import { Prisma, Transactions } from '@prisma/client';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { IUsersRepository } from '../../../user/repositories/interfaces/IUserRepository';
import { ITransactionRepository } from '../../repositories/interface/ITransactionRespository';
import { IUser } from '../../../user/dtos/IUserDTO';
import { prisma } from '../../../../shared/infra/database';
import { ITransaction } from '../../dtos/ITransactionDTO';

interface AccountTypes {
  id: string;
}

export type FilterTypes = {
  id: string
  date_transaction: string
  cash_type: string
}

@injectable()
class TransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('AccountUserRepository')
    private usersRepository: IUsersRepository,
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute(
    data: ITransaction
  ) {
    try {
      const newTransactions = await this.transactionRepository.createTransaction(
        data
      );
    } catch (err) {
      throw new AppError('Ocorreu um erro, por favor, tente mais tarde');
    }
  }

}

export { TransactionUseCase };

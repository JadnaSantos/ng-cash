import { Transactions } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ITransactionRepository } from '../../repositories/interface/ITransactionRespository';

interface IRequest {
  debited_user: string,
  credited_user: string,
  value: number,
}

@injectable()
class TransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository,
  ) { }

  async execute(): Promise<void> {

  }
}



export { TransactionUseCase };

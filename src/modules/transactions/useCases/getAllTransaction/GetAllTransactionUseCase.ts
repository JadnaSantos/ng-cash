/* eslint-disable indent */
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ITransactionRepository } from '../../repositories/interface/ITransactionRespository';
import { Transactions } from '@prisma/client';

interface IRequest {
  from?: string,
  to?: string,
  userId: number,
  searchMethod: string
}

@injectable()
class GetAllTransactioUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) { }


  async execute(data: IRequest) {
    console.log(data);
  }
}

export { GetAllTransactioUseCase };

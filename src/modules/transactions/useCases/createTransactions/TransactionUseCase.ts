import { Transactions } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
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
    private accountRepository: IAccountRepository
  ) { }

}

export { TransactionUseCase };

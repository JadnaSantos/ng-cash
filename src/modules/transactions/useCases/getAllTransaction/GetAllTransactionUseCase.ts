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
    const account = await this.accountRepository.findAccountById(
      data.userId
    );

    let transactions: Transactions[];

    switch (data.searchMethod) {
      case 'all':
        if (!data.userId) {
          throw new AppError('Account not found');
        }

        transactions = await this.transactionRepository.getAllTransactions(account.id);

        return transactions;

      case 'credited':
        if (!data.userId) {
          throw new AppError('Account not found');
        }

        transactions = await this.transactionRepository.getCreditedTransactions(account.id);

        return transactions;

      case 'debited':
        if (!data.userId) {
          throw new AppError('Account not found');
        }

        transactions = await this.transactionRepository.getDebitedTransactions(account.id);

        return transactions;

      case 'date':
        if (!data.userId) {
          throw new AppError('Account not found');
        }
        if (!data.from || !data.to) {
          throw new AppError('No dates found in the request');
        }

        transactions = await this.transactionRepository
          .findManyByDateRange(
            account.id,
            data.from,
            data.to
          );

        return transactions;


      default:
        throw new AppError(`Invalid search method [ ${data.searchMethod} ]`, console.log(data.searchMethod));

    }
  }
}

export { GetAllTransactioUseCase };

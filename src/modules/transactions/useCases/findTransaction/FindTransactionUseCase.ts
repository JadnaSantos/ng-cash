import { injectable, inject } from 'tsyringe';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ITransactionRepository } from '../../repositories/interface/ITransactionRespository';


@injectable()
class FindTransactioUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }
}

export { FindTransactioUseCase };

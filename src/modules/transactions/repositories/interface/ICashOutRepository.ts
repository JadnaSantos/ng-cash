import { ITransaction } from '../../dtos/ITransactionDTO';

interface ICashOutRepository {
  createTransaction(data: ITransaction): void
}


export { ICashOutRepository };

import { Transactions } from '@prisma/client';
import { ITransaction } from '../../dtos/ITransactionDTO';

interface ITransactionRepository {
  create(data: ITransaction): Promise<Transactions>
  filterDebited(data: ITransaction): Promise<Transactions[]>
  filterCredited(data: ITransaction): Promise<Transactions[]>
  debited(data: ITransaction): Promise<Transactions[]>
  credited(data: ITransaction): Promise<Transactions[]>
}


export { ITransactionRepository };

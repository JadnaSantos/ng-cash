import { Transactions } from '@prisma/client';
import { ITransaction } from '../../dtos/ITransactionDTO';

interface ITransactionRepository {
  getAllTransactions(id: number): Promise<Transactions[]>
  getDebitedTransactions(id: number): Promise<Transactions[]>
  getCreditedTransactions(id: number): Promise<Transactions[]>
  createTransaction(data: ITransaction): Promise<Transactions>
  findManyByDateRange(id: number, from: string, to: string): Promise<Transactions[]>
}


export { ITransactionRepository };

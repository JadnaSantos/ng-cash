import { Transactions } from '@prisma/client';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';

interface ITransactionRepository {
  findAllTransactions({ id }: ITransactionDTO): Promise<Transactions[]>
  findManyByCashOut({ id }: ITransactionDTO): Promise<Transactions[]>
  findManyByCashIn({ id }: ITransactionDTO): Promise<Transactions[]>
  findManyByDateRange(id: string, from: string, to: string): Promise<Transactions[]>
  create({ id, creditedAccountId, debitedAccountId, value }: ITransactionDTO): void
}



export { ITransactionRepository };

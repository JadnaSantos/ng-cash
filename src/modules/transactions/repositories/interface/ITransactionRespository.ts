import { Transactions } from '@prisma/client';

export interface ICreateTransaction {
  value: number
  username: string
  userId: number
}

interface ITransactionRepository {
  createTransaction(debitedAccountId: number, creditedAccountId: number, value: number): Promise<Transactions>
}


export { ITransactionRepository };

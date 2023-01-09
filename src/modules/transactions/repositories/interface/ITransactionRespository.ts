import { Transactions } from '@prisma/client';

interface ITransaction {
  findByAccountId(id: number): Promise<Transactions[]>
}



export { ITransaction };

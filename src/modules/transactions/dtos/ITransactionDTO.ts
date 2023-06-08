interface ITransaction {
  id: number;
  debitedAccountId?: number;
  creditedAccountId?: number;
  createdAt?: Date;
}

export { ITransaction };

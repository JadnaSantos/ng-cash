import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IAccountRepository } from '../../../account/repositories/interface/IAccountRepository';
import { ICreateTransaction } from '../../repositories/interface/ITransactionRespository';
import { IUsersRepository } from '../../../user/repositories/interfaces/IUserRepository';
import { Accounts, Transactions, Users } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('AccountUserRepository')
    private accountRepository: IAccountRepository
  ) { }

  async execute({ value, username, userId }: ICreateTransaction): Promise<[Users, Accounts, Transactions]> {

    const user = await this.userRepository.findByAccountUsername(userId);
    const debitedAccount = await this.accountRepository.checkBalace(userId);
    const creditedAccount = await this.accountRepository.findAccountByUsername(username);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.username === username) {
      throw new AppError('You can not tranfer money to yourself', 400);
    }


    if (!debitedAccount) {
      throw new AppError('Source account not found', 404);
    }

    const debitedAccountBalance = Number(debitedAccount.balance);

    if (debitedAccountBalance < value) {
      throw new AppError('Insufficient funds.', 400);
    }

    if (!creditedAccount) {
      throw new AppError(' Destination account not found.', 404);
    }

    const updatedDebitedAccountBalance = debitedAccountBalance - value;
    const updatedCreditAccountBalance = Number(creditedAccount.balance) + value;

    const transaction = await prisma.$transaction([
      prisma.accounts.update({
        where: {
          id: debitedAccount.id
        },
        data: {
          balance: updatedDebitedAccountBalance
        }
      }),
      prisma.accounts.update({
        where: {
          id: creditedAccount.id
        },
        data: {
          balance: updatedCreditAccountBalance
        }
      }),
      prisma.transactions.create({
        data: {
          value,
          debitedAccountId: debitedAccount.id,
          creditedAccountId: creditedAccount.id
        }
      })
    ]);

    return transaction as unknown as [Users, Accounts, Transactions];
  }

}

export { CreateTransactionUseCase };

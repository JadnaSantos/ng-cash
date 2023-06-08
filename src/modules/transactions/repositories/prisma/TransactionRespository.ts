import { prisma } from '../../../../shared/infra/database';
import { ITransactionRepository } from '../interface/ITransactionRespository';
import { AppError } from '../../../../shared/infra/http/errors/AppError';

class TransactionRepository implements ITransactionRepository {
  async listTransitions(id: number) {
    const account = await prisma.accounts.findMany({
      where: {
        id
      }
    });

    if (!account) {
      throw new AppError('Conta não encontrada.', 404);
    }
  }
}

export { TransactionRepository };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAllTransactioUseCase } from './GetAllTransactionUseCase';

class GetAllTransactionController {
  async handle(request: Request, response: Response) {
    const { userId, searchMethod, from, to } = request.body;

    const userTransaction = container.resolve(GetAllTransactioUseCase);

    const transaction = await userTransaction.execute({
      userId,
      searchMethod,
      from,
      to,
    });

    return response.status(201).json(transaction);
  }
}

export { GetAllTransactionController };

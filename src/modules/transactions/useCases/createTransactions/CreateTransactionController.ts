import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

class TransactionController {
  async handle(request: Request, response: Response) {
    const id = request.user.id;
    const { value, username } = request.body;

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase);

    const transaction = await createTransactionUseCase.execute({
      userId: id,
      username,
      value
    });

    return response.status(201).json(transaction);
  }
}

export { TransactionController };

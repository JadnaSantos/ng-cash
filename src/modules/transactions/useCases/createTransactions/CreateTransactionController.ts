import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

class TransactionController {
  async handle(request: Request, response: Response) {
    const id = request.user.id;
    const { credited_user, value } = request.body;

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase);
    const result = await createTransactionUseCase.execute({
      debited_user: id,
      credited_user,
      value
    });

    return response.status(201).json(result);
  }
}

export { TransactionController };

import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AccountUserUseCase } from './AccountUserUseCase';

class AccountUserController {
  async handle(request: Request, response: Response) {

    const id = request.user.id;

    const accountUserCase = container.resolve(AccountUserUseCase);

    const account = await accountUserCase.execute({ id });

    return response.status(201).json(account);
  }
}

export { AccountUserController };

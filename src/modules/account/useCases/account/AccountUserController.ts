import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AccountUserUseCase } from './AccountUserUseCase';

class AccountUserController {
  async handle(request: Request, response: Response) {

    const user_id = request.user.id;

    const accountUserCase = container.resolve(AccountUserUseCase);

    const account = await accountUserCase.execute(user_id as unknown as number);

    return response.status(201).json(account);
  }
}

export { AccountUserController };

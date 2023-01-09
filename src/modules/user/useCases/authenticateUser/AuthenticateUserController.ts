import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticatedUseUseCase = container.resolve(AuthenticateUserUseCase);

    const tokenResponse = await authenticatedUseUseCase.execute({
      username,
      password
    });

    return response.json(tokenResponse);
  }

}

export { AuthenticateUserController };

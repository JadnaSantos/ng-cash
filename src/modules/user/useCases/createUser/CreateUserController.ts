import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserCase = container.resolve(CreateUserUseCase);

    const user = await createUserCase.execute({
      username,
      password
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };

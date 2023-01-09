import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UserProfileUserCase } from './UserProfileUseCase';


class UserProfileController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const createUserCase = container.resolve(UserProfileUserCase);

    const user = await createUserCase.execute(id);

    return response.status(201).json(user);
  }
}

export { UserProfileController };

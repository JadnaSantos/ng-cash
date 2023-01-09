import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository';

@injectable()
class UserProfileUserCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: number) {

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Username not found!');
    }

    return user;
  }
}

export { UserProfileUserCase };

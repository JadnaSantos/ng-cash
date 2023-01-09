import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository';

interface IResponse {
  user: {
    username: string,
  },
  token: string
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute(username: string, password: string) {
    const user = await this.usersRepository.findByEmail(username);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or passoword is incorrect!',);
    }

    const token = sign({ username }, 'ea4a8611b3d582013a33f8ff42cbaf39', {
      subject: String(user.id),
      expiresIn: '1d'
    });

    const tokenResponse: IResponse = {
      user: {
        username: user.username,
      },
      token
    };

    return tokenResponse;
  }

}

export { AuthenticateUserUseCase };

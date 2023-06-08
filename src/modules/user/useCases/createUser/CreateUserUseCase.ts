import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUser } from '../../dtos/IUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    username,
    password
  }: IUser) {

    const isExistEmail = await this.usersRepository.findByUsername(username);

    if (isExistEmail) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword
    });

    return user;
  }
}


export { CreateUserUseCase };

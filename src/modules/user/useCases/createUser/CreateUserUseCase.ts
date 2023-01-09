import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { AppError } from '../../../../shared/infra/http/errors/AppError';


@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    username,
    password
  }: ICreateUserDTO) {

    const isExistEmail = await this.usersRepository.findByEmail(username);

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

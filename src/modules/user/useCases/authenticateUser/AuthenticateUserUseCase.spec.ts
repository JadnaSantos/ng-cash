import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUser } from '../../dtos/IUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUser: CreateUserUseCase;

describe('Authenticate User', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );

    createUser = new CreateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate user', async () => {
    const user: IUser = {
      username: 'test@example.com',
      password: '12345678',
    };

    await createUser.execute({ ...user });

    const userResponse = await authenticateUserUseCase.execute({
      username: user.username,
      password: user.password,
    });

    expect(userResponse).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent use', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: 'test@email.com',
        password: '123',
      });
    }).rejects.toEqual(new AppError('User does not exist', 404));
  });

  it('Should not be able to authenticate an user with a incorrect password', async () => {
    const user: IUser = {
      username: 'test@email.com',
      password: '123',
    };

    await createUser.execute({
      ...user,
    });

    await expect(
      authenticateUserUseCase.execute({
        username: user.username,
        password: '321',
      })
    ).rejects.toEqual(new AppError('Email or passoword is incorrect!', 404));
  });

});

import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;


describe('Create User', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to create a new user', async () => {
    const user = {
      username: 'johndoe@gmail.com',
      password: 'john123',
    };

    await createUserUseCase.execute({
      username: user.username,
      password: user.password,

    });

    const userCreated = await usersRepositoryInMemory.findByEmail(user.username);
    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new user if email already in use', () => {

    expect(async () => {

      const user = {
        username: 'johndoe@gmail.com',
        password: 'john123',
      };

      await createUserUseCase.execute({
        username: user.username,
        password: user.password,
      });

      await createUserUseCase.execute({
        username: user.username,
        password: user.password,
      });

    }).rejects.toEqual(new AppError('Email already exists'));
  });
});


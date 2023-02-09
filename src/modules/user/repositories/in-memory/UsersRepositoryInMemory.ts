import { Users } from '@prisma/client';
import { IUser } from '../../dtos/IUserDTO';
import { IUsersRepository } from '../../repositories/interfaces/IUserRepository';

class UsersRepositoryInMemory implements IUsersRepository {

  users: Users[] = [];

  async create({
    id,
    username,
    password,
  }: IUser): Promise<Users> {
    const user: Users = {
      id: Number(id),
      username,
      password,
      accountId: 100,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(id: number): Promise<Users | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(username: string): Promise<Users | null> {
    return this.users.find(user => user.username === username) || null;
  }
}

export { UsersRepositoryInMemory };

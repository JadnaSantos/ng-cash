import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../../dtos/IUserDTO';

interface IUsersRepository {
  create({ username, password }: ICreateUserDTO): Promise<Users>;
  findById(id: number): Promise<Users | null>;
  findByEmail(username: string): Promise<Users | null>;

}

export { IUsersRepository };

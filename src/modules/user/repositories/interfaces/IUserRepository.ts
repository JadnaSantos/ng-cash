import { Users } from '@prisma/client';
import { IUser } from '../../dtos/IUserDTO';
interface IUsersRepository {
  create({ username, password }: IUser): Promise<Users>;
  findById(id: number): Promise<Users | null>;
  findByUsername(username: string): Promise<Users | null>;
  findByAccountUsername(id: number): Promise<Users | null>
}

export { IUsersRepository };

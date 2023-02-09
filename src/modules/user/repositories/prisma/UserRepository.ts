import { Users } from '@prisma/client';
import { prisma } from '../../../../shared/infra/database';
import { IUser } from '../../dtos/IUserDTO';
import { IUsersRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUsersRepository {

  async create({ username, password }: IUser): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        username,
        password,
        accounts: {
          create: { balance: 100 }
        }
      },
      include: {
        accounts: true
      }

    });

    return user;
  }

  async findById(id: number): Promise<Users> {
    const user = await prisma.users.findUnique({
      where: {
        accountId: id
      },
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });

    return user as Users;
  }

  async findByEmail(username: string): Promise<Users> {
    const user = await prisma.users.findUnique({
      where: {
        username
      },
      include: {
        accounts: {
          select: {
            balance: true
          }
        }
      }
    });

    return user as Users;
  }

}

export { UserRepository };

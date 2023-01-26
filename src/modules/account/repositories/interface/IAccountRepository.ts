import { Accounts } from '@prisma/client';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';

interface IAccountRepository {
  findAccountById({ id }: IAccountUserDTO): Promise<Accounts>
}

export { IAccountRepository };

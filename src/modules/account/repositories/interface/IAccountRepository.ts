import { Accounts } from '@prisma/client';
import { IAccountUserDTO } from '../../dtos/IAccountUserDTO';

interface IAccountRepository {
  accountBalance({ id }: IAccountUserDTO): Promise<Accounts>
}

export { IAccountRepository };

import { AccountRepositoryInMemory } from '../../repositories/in-memory/AccountRepositoryInMemory';
import { AccountUserUseCase } from './AccountUserUseCase';

let accountUserUseCase: AccountUserUseCase;
let accountUserRepositoryInMemory: AccountRepositoryInMemory;

describe('Account User', () => {

  beforeEach(() => {
    accountUserRepositoryInMemory = new AccountRepositoryInMemory();
    accountUserUseCase = new AccountUserUseCase(
      accountUserRepositoryInMemory,
    );
  });


  it('should be able to view your own current balance', async () => {
    const account = {
      id: 1,
      balance: 100
    };

    const accountUser = await accountUserUseCase.execute({
      id: account.id,
      balance: account.balance
    });

    expect(accountUser).toHaveProperty('id');
    expect(accountUser).toHaveProperty('balance');
  });
});

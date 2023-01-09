import { Router } from 'express';
import { AccountUserController } from '../../../../modules/account/useCases/account/AccountUserController';

const accountUserRouter = Router();

const accountUserUseCase = new AccountUserController();

accountUserRouter.get('/', accountUserUseCase.handle);

export { accountUserRouter };

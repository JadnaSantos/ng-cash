import { Router } from 'express';
import { AccountUserController } from '../../../modules/account/useCases/account/AccountUserController';

const accountUserRouter = Router();

const accountUserUseCase = new AccountUserController();

accountUserRouter.get('/:id', accountUserUseCase.handle);

export { accountUserRouter };

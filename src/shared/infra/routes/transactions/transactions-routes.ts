import { Router } from 'express';
import { GetAllTransactionController } from '../../../../modules/transactions/useCases/getAllTransaction/GetAllTransactionController';

const transactionRouter = Router();

const transactionUseCase = new GetAllTransactionController();

transactionRouter.get('/', transactionUseCase.handle);

export { transactionRouter };

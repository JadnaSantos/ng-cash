import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { GetAllTransactionController } from '../../../../modules/transactions/useCases/getAllTransaction/GetAllTransactionController';
import { TransactionController } from '../../../../modules/transactions/useCases/createTransactions/CreateTransactionController';

const transactionRouter = Router();

const transactionUseCase = new GetAllTransactionController();
const createTransactionUseCase = new TransactionController();

transactionRouter.get('/', transactionUseCase.handle);

transactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      credited_user: Joi.number().required(),
      value: Joi.number().required()
    },
  }),

  createTransactionUseCase.handle
);

export { transactionRouter };

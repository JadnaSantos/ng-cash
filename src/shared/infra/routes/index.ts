import { Router } from 'express';
import { ensureAuthenticated } from '../http/middlewares/ensureAuthenticated';
import { accountUserRouter } from './accounts/account.routes';
import { authenticateRouter } from './authentication/authenticate.routes';
import { transactionRouter } from './transactions/transactions-routes';
import { userRoutes } from './users/user-routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', authenticateRouter);
routes.use('/account', ensureAuthenticated, accountUserRouter);
routes.use('/transfer', ensureAuthenticated, transactionRouter);
routes.use('/all-transaction', ensureAuthenticated, transactionRouter);

export { routes };

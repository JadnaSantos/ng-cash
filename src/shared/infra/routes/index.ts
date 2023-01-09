import { Router } from 'express';
import { ensureAuthenticated } from '../http/middlewares/ensureAuthenticated';
import { accountUserRouter } from './accountUser.routes';
import { authenticateRouter } from './authenticate.routes';
import { userRoutes } from './user-routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/sessions', authenticateRouter);
routes.use('/account', ensureAuthenticated, accountUserRouter);

export { routes };

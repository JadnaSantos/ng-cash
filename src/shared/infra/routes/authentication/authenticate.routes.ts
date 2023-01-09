import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthenticateUserController } from '../../../../modules/user/useCases/authenticateUser/AuthenticateUserController';

const authenticateRouter = Router();

const authenticateController = new AuthenticateUserController();

authenticateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  authenticateController.handle
);

export { authenticateRouter };

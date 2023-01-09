import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CreateUserController } from '../../../../modules/user/useCases/createUser/CreateUserController';

const userRoutes = Router();

const userController = new CreateUserController();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().email().required().min(3),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(8),
    },
  }),

  userController.handle,
);

export { userRoutes };

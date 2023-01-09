import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface IPayload {
  username: string
  sub: string
}


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'ea4a8611b3d582013a33f8ff42cbaf39') as IPayload;

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch (error) {
    throw new AppError('Token Invalid', 401);
  }
}


export { ensureAuthenticated };

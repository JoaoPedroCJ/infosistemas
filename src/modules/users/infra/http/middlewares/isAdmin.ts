import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default async function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;

  const showProfile = container.resolve(ShowProfileService);

  const user = await showProfile.execute({ user_id });

  if (!user.admin) {
    throw new AppError("User doesn't have enough rights.", 403);
  }

  return next();
}

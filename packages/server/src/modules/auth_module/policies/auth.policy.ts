import { Request } from 'express';
import { IUser } from '../types/IUser';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthRepository } from '../repositories/auth.repository';

@injectable()
export class AuthPolicy {
  private authRepository: AuthRepository;
  constructor(@inject(TYPES.AuthRepository) authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  public async register(req: Request): Promise<IUser> {
    const data: IUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      jobtitle: req.body.jobtitle,
      compnay: req.body.compnay,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    };

    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return data;
  }
}

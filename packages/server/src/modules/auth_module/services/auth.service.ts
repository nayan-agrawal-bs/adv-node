/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'inversify';
import { IRegisterUser } from '../types/IRegisterUser';
import { AuthRepository } from '../repositories/auth.repository';
import { TYPES } from '../types';
import { AuthStrategyTypes, BearerStrategy } from 'auth-strategies';
import { v4 as uuid } from 'uuid';
import { env } from 'process';
@injectable()
export class AuthService {
  private authRepository: AuthRepository;
  private authStrategy: BearerStrategy;
  constructor(
    @inject(TYPES.AuthRepository) authRepository: AuthRepository,
    @inject(AuthStrategyTypes.AuthStrategy) authStrategy: BearerStrategy
  ) {
    this.authRepository = authRepository;
    this.authStrategy = authStrategy;
  }

  public async register(data: IRegisterUser) {
    try {
      const existingUser = await this.authRepository.findUserByEmail(
        data.email
      );
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const newUser = await this.authRepository.registerUser(data);
      return newUser;
    } catch (error) {
      console.error('User registration failed:', error);
      throw error;
    }
  }

  public async login(name: string, password: string) {
    const user = await this.authRepository.login(name, password);
    let expiresIn = '4h';
    if (env?.AUTH_TOKEN_EXPIRY && env.AUTH_TOKEN_EXPIRY !== '') {
      expiresIn = env.AUTH_TOKEN_EXPIRY;
    }
    const token = this.authStrategy.token(
      {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
      },
      { expiresIn }
    );
    return token;
  }

  public async forgotPassword(userId: string) {
    try {
      const token = uuid();
      await this.authRepository.forgotPassword(userId, token);
      return token;
    } catch (error) {
      console.error('Sending forgot password email failed:', error);
      throw error;
    }
  }

  public async resetPassword(token: string, password: string) {
    try {
      await this.authRepository.resetPassword(token, password);
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }
}

import { inject, injectable } from 'inversify';
import { IUser } from '../types/IUser';
import { AuthRepository } from '../repositories/auth.repository';
import { TYPES } from '../types';

@injectable()
export class AuthService {
  private authRepository: AuthRepository;
  constructor(@inject(TYPES.AuthRepository) authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  public async register(data: IUser) {
    return await this.authRepository.createUser(data);
  }

  public async login(name: string, password: string) {
    const user = await this.authRepository.login(name, password);
    return user;
  }
}

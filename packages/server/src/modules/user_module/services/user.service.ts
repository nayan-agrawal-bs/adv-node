import { inject, injectable } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { TYPES, IUser } from '../types';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async update(user: IUser) {
    return await this.userRepository.update(user);
  }

  async findById(id: string) {
    const data = await this.userRepository.findById(id);
    if (!data) {
      throw new Error('User not found');
    }
    return data;
  }
}

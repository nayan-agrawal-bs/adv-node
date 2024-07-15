import { Request } from '../../../types';
import { inject, injectable } from 'inversify';
import { TYPES, IUser } from '../types';
import { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserPolicy {
  private userRepository: UserRepository;
  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  updateProfile(req: Request): IUser {
    const user = this.userRepository.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }

    const data: IUser = {
      id: req.user.id,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      note: req.body.note,
      profileImg: req.body.profileImg,
    };

    return data;
  }
}

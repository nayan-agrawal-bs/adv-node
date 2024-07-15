import { inject, injectable } from 'inversify';
import { PrismaClient, extendUser } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { IUser } from '../types';
import { omitEmpty } from '../../../shared/utils/helper';
import _ from 'underscore';

@injectable()
export class UserRepository {
  private _prisma: ReturnType<typeof extendUser>;

  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = extendUser.call(prisma);
  }

  async findById(id: string) {
    const user = await this._prisma.user.findFirst({
      where: {
        id,
      },
    });
    const profile = await this._prisma.userProfile.findFirst({
      where: {
        userId: id,
      },
    });

    return {
      ..._.omit(user, ['password', 'reset_token', 'verification_OTP']),
      ..._.omit(profile, ['id']),
    };
  }

  async update(data: IUser) {
    if (data.email) {
      await this._prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          email: data.email,
        },
      });
    }

    const user = await this._prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    const profile = await this._prisma.userProfile.update({
      where: {
        userId: data.id,
      },
      data: omitEmpty(_.omit(data, ['email', 'id'])),
    });

    return {
      ..._.omit(user, ['password', 'reset_token', 'verification_OTP']),
      ..._.omit(profile, ['id']),
    };
  }
}

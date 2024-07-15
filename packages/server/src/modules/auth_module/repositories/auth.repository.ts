import { inject, injectable } from 'inversify';
import type { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { IRegisterUser } from '../types/IRegisterUser';
import bcrypt from 'bcrypt';
import _ from 'underscore';
@injectable()
export class AuthRepository {
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
      include: {
        UserProfile: true,
      },
    });
  }

  public async login(name: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: name.toLowerCase(),
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });

    return { ...user, ..._.omit(profile, 'id') };
  }

  public async registerUser(data: IRegisterUser) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashPassword,
      },
    });

    const profile = await this.prisma.userProfile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        note: data.note,
        userId: user.id,
      },
    });

    return {
      ..._.omit(user, ['password', 'reset_token', 'verification_OTP']),
      ..._.omit(profile, 'id'),
    };
  }
  public async forgotPassword(id: string, token: string) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        reset_token: token,
        reset_token_date: new Date(),
      },
    });

    return { ...user };
  }

  public async findUserByToken(token: string, exprity: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        reset_token: token,
        reset_token_date: {
          lte: new Date(new Date().getTime() + 60 * 60 * exprity),
        },
      },
    });

    return { ...user };
  }

  public async resetPassword(token: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.update({
      where: {
        reset_token: token,
      },
      data: {
        password: hashPassword,
        reset_token: null,
        reset_token_date: null,
        updatedAt: new Date(),
      },
    });
  }
}

import { inject, injectable } from 'inversify';
import type { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { IUser } from '../types/IUser';
import bcrypt from 'bcrypt';
@injectable()
export class AuthRepository {
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {}

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  public async login(name: string, password: string) {
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

    return user;
  }

  public async createUser(data: IUser) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashPassword,
      },
    });

    const profile = await this.prisma.userProfile.create({
      data: {
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        note: data.note,
        userId: user.id,
      },
    });

    return { ...user, profile };
  }
}

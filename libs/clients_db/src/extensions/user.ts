import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// eslint-disable-next-line no-unused-vars
export function extendUser(this: PrismaClient) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const prisma = this;
  return prisma.$extends({
    model: {
      user: {
        async findByEmail(email: string) {
          return prisma.user.findFirst({
            where: { email },
            include: { UserProfile: true },
          });
        },
        async findById(id: string) {
          return prisma.user.findFirst({
            where: { id },
            include: { UserProfile: true },
          });
        },
        async hashPassword(password: string) {
          return bcrypt.hash(password, 10);
        },
        async comparePassword(password: string, hash: string) {
          return bcrypt.compare(password, hash);
        },
      },
    },
  });
}

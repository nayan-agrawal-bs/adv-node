import { inject, injectable } from 'inversify';
import { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { CreateDto, UpdateDto } from '../types';
@injectable()
export class $$repository_class_name$$ {
  private _prisma: PrismaClient;
  constructor(@inject(PrismaClientSymbol) private prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async create(dto: CreateDto) {
    return await this._prisma.modelName.create({
      data: dto,
    });
  }

  async findById(id: string) {
    return await this._prisma.modelName.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this._prisma.modelName.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return await this._prisma.modelName.delete({
      where: {
        id: id,
      },
    });
  }
}

import { inject, injectable } from 'inversify';
import { PrismaClient } from 'clients-db';
import { PrismaClientSymbol } from 'clients-db';
import { CreateDto, UpdateDto } from '../types';
import { Estate } from '@prisma/client'; // Import Estate type

@injectable()
export class EstateRepository {
  private _prisma: PrismaClient;

  constructor(@inject(PrismaClientSymbol) prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async create(dto: CreateDto) {
    return await this._prisma.estate.create({
      data: dto,
    });
  }

  async findById(id: string) {
    return await this._prisma.estate.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateDto) {
    return await this._prisma.estate.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return await this._prisma.estate.delete({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string): Promise<Estate[]> {
    return this._prisma.estate.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findMany(): Promise<Estate[]> {
    return this._prisma.estate.findMany();
  }

  async findByLocation(location: string): Promise<Estate[]> {
    return this._prisma.estate.findMany({
      where: {
        location: {
          contains: location,
          mode: 'insensitive',
        },
      },
    });
  }
}

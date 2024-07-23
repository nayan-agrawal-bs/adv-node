import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { CreateDto, TYPES, UpdateDto } from '../types';
import { EstateRepository } from '../repositories/estate.repository';

@injectable()
export class EstatePolicy {
  private estateRepository: EstateRepository;
  constructor(
    @inject(TYPES.EstateRepository)
    estateRepository: EstateRepository
  ) {
    this.estateRepository = estateRepository;
  }

  createDto(req: Request): CreateDto {
    const dto = { name: req.body.name, location: req.body.location };

    return dto;
  }

  updateDto(req: Request): UpdateDto {
    return this.createDto(req);
  }
}

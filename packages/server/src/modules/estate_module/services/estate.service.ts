import { inject, injectable } from 'inversify';
import { EstateRepository } from '../repositories/estate.repository';
import { CreateDto, TYPES, UpdateDto } from '../types';

@injectable()
export class EstateService {
  private estateRepository: EstateRepository;
  constructor(
    @inject(TYPES.EstateRepository)
    estateRepository: EstateRepository
  ) {
    this.estateRepository = estateRepository;
  }

  async create(dto: CreateDto) {
    return await this.estateRepository.create(dto);
  }

  async findById(id: string) {
    return await this.estateRepository.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.estateRepository.update(id, dto);
  }

  async delete(id: string) {
    return await this.estateRepository.delete(id);
  }

  async searchByName(name: string) {
    let result = await this.estateRepository.findMany();

    if (name) {
      result = result.filter(estate => estate.name.includes(name));
    }
  }

  async filterByLocation(location: string) {
    return await this.estateRepository.findByLocation(location);
  }
}

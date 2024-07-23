import 'reflect-metadata';
import { EstateService } from '../services/estate.service';
import { EstateRepository } from '../repositories/estate.repository';
import { CreateDto, UpdateDto } from '../types';
import { PrismaClient } from '@prisma/client';

jest.mock('../repositories/estate.repository');
jest.mock('@prisma/client');

describe('EstateService', () => {
  let estateService: EstateService;
  let estateRepository: jest.Mocked<EstateRepository>;
  let prisma: jest.Mocked<PrismaClient>;

  const mockEstate = {
    id: '1',
    name: 'Estate Name',
    location: 'Location',
    type: 'Type',
    numbeOfRooms: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEstates = [
    { ...mockEstate, id: '1' },
    { ...mockEstate, id: '2', name: 'Another Estate' },
  ];

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    estateRepository = new EstateRepository(
      prisma
    ) as jest.Mocked<EstateRepository>;
    estateService = new EstateService(estateRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an estate', async () => {
      const createDto: CreateDto = {
        name: 'Estate Name',
        location: 'Location',
      };

      estateRepository.create.mockResolvedValue(mockEstate);

      const result = await estateService.create(createDto);

      expect(result).toEqual(mockEstate);
      expect(estateRepository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findById', () => {
    it('should return an estate by id', async () => {
      estateRepository.findById.mockResolvedValue(mockEstate);

      const result = await estateService.findById(mockEstate.id);

      expect(result).toEqual(mockEstate);
      expect(estateRepository.findById).toHaveBeenCalledWith(mockEstate.id);
    });
  });

  describe('update', () => {
    it('should update an estate', async () => {
      const updateDto: UpdateDto = {
        name: 'Updated Estate Name',
        location: 'Updated Location',
      };
      const updatedEstate = { ...mockEstate, ...updateDto };

      estateRepository.update.mockResolvedValue(updatedEstate);

      const result = await estateService.update(mockEstate.id, updateDto);

      expect(result).toEqual(updatedEstate);
      expect(estateRepository.update).toHaveBeenCalledWith(
        mockEstate.id,
        updateDto
      );
    });
  });

  describe('delete', () => {
    it('should delete an estate', async () => {
      estateRepository.delete.mockResolvedValue(mockEstate);

      const result = await estateService.delete(mockEstate.id);

      expect(result).toEqual(mockEstate);
      expect(estateRepository.delete).toHaveBeenCalledWith(mockEstate.id);
    });
  });

  describe('searchByName', () => {
    it('should return estates that match the search name', async () => {
      const searchName = 'Estate Name';
      estateRepository.findByName.mockResolvedValue(mockEstates);

      const result = await estateService.searchByName(searchName);

      expect(result).toEqual(mockEstates);
      expect(estateRepository.findByName).toHaveBeenCalledWith(searchName);
    });
  });

  describe('filterByLocation', () => {
    it('should return estates that match the filter location', async () => {
      const filterLocation = 'Location';
      estateRepository.findByLocation.mockResolvedValue(mockEstates);

      const result = await estateService.filterByLocation(filterLocation);

      expect(result).toEqual(mockEstates);
      expect(estateRepository.findByLocation).toHaveBeenCalledWith(
        filterLocation
      );
    });
  });
});

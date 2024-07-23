export const TYPES = {
  EstateController: Symbol.for('EstateController'),
  EstateService: Symbol.for('EstateService'),
  EstatePolicy: Symbol.for('EstatePolicy'),
  EstateRepository: Symbol.for('EstateRepository'),
};

export interface CreateDto {
  name: string;
  location: string;
  type?: string; // Add type
  numbeOfRooms?: string;
}

export type UpdateDto = Partial<CreateDto>;

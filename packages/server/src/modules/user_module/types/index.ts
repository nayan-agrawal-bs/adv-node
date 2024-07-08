export const TYPES = {
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  UserPolicy: Symbol.for('UserPolicy'),
  UserRepository: Symbol.for('UserRepository'),
};

export interface UserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export interface ProfileDto {
  bio: string;
}

export interface CreateDto {
  user: UserDto;
  profile: ProfileDto;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateDto extends Partial<CreateDto> {}

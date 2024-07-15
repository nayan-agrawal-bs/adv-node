import { IUser } from './IUser';

const TYPES = {
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  UserPolicy: Symbol.for('UserPolicy'),
  UserRepository: Symbol.for('UserRepository'),
};

export { IUser, TYPES };

import { IUser } from './IUser';

const TYPES = {
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  AuthPolicy: Symbol.for('AuthPolicy'),
  AuthRepository: Symbol.for('AuthRepository'),
};
export { type IUser, TYPES };

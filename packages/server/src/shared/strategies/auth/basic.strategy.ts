import { Request } from 'express';
import bcrypt from 'bcrypt';
import { AuthStrategy } from './auth.strategy';
import { InvalidLoginAndPassword } from '../../utils/apiError';

export default class BasicStrategy implements AuthStrategy {
  options: Record<string, any>;

  constructor() {
    this.options = {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authenticate(req: Request & { user: any }): Promise<void> {
    const { username, password } = req.body;

    const user = await this.findUser(username, password);
    if (!user) {
      throw new InvalidLoginAndPassword();
    }
    req.user = user;
  }

  /**
   * @todo Need to be implemented, put the logic to find the user in the database
   * Asynchronously finds a user by their username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<any>} A Promise that resolves to the user object if the username and password match, or null otherwise.
   */
  async findUser(username: string, password: string) {
    const user: any = null;
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }

    return user;
  }
}

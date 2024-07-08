import { Request, Response } from 'express';

export interface AuthStrategy {
  // options for the strategy
  options: Record<string, any>;

  /**
   * Authenticate incoming request
   *
   * @param {Request} req - Incoming request object
   * @param args - Additional arguments
   */
  authenticate(req: Request, res: Response, ...args: any): Promise<void>;
}

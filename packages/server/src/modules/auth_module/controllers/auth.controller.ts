import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { AuthService } from '../services/auth.service';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { AuthPolicy } from '../policies/auth.policy';
import { TYPES } from '../types';
import { authValidator } from '../validators/auth.chain';
import { validationResult } from 'express-validator';
import { LogTypes, LoggerFactory } from 'logger';
@controller('/auth', 'BearerAuthMiddleware')
export class AuthController {
  private authService: AuthService;
  private authPolicy: AuthPolicy;
  private logger;

  constructor(
    @inject(TYPES.AuthService) authService: AuthService,
    @inject(TYPES.AuthPolicy) authPolicy: AuthPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    this.authService = authService;
    this.authPolicy = authPolicy;
    this.logger = loggerFactory.createLogger('AuthController');
  }

  @httpGet('/info')
  public async info(req: Request, res: Response) {
    this.logger.info('Auth module is working!');
    return res.status(200).json({ message: 'Auth module is working!' });
  }

  @httpPost('/register', ...authValidator.register)
  public async register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const reqData = await this.authPolicy.register(req);
      const user = await this.authService.register(reqData);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

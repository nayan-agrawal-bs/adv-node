import { inject } from 'inversify';
import { Request } from '../../../types';
import {
  controller,
  httpGet,
  BaseHttpController,
  interfaces,
  httpPut,
} from 'inversify-express-utils';

import { UserService } from '../services/user.service';
import { UserPolicy } from '../policies/user.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import userValidator from '../validators/index.chain';
import openAPI from './user.openapi';
import { ApiOperationGet, ApiOperationPut, ApiPath } from 'swagger-express-ts';

@ApiPath({
  path: '/users',
  name: 'User',
  security: { basicAuth: [] },
})
@controller('/users')
export class UserController
  extends BaseHttpController
  implements interfaces.Controller
{
  private userService: UserService;
  private userPolicy: UserPolicy;
  private logger;

  constructor(
    @inject(TYPES.UserService) userService: UserService,
    @inject(TYPES.UserPolicy) userPolicy: UserPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.userService = userService;
    this.userPolicy = userPolicy;
    this.logger = loggerFactory.createLogger('UserController');
  }

  /**
   * Info
   * @param req
   * @param res
   * @returns
   */
  @ApiOperationGet(openAPI.info)
  @httpGet('/info')
  public async info() {
    this.logger.info('User module is working!');
    return this.json({ message: 'User module is working!' }, 200);
  }

  @ApiOperationPut(openAPI.updateUser)
  @httpPut(
    '/',
    'BearerAuthMiddleware',
    ValidationMiddleware.validate(userValidator.updateUser)
  )
  public async update(req: Request) {
    const user = this.userPolicy.updateProfile(req);

    const result = await this.userService.update(user);

    return this.json(
      { data: result, message: 'User Updated Sucessfully' },
      200
    );
  }

  @ApiOperationGet(openAPI.getUser)
  @httpGet('/', 'BearerAuthMiddleware')
  public async getById(req: Request) {
    const result = await this.userService.findById(req.user.id);

    return this.json({ data: result, message: 'Get User Sucessfully' }, 200);
  }
}

import { Request } from '../../../types';
import { inject } from 'inversify';
import { AuthService } from '../services/auth.service';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  BaseHttpController,
} from 'inversify-express-utils';
import { AuthPolicy } from '../policies/auth.policy';
import { TYPES } from '../types';
import { authValidator } from '../validators/auth.chain';
import { LogTypes, LoggerFactory } from 'logger';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import openAPI from './auth.openapi';
import { MailerTypes, MailService, TEMPLATE_NAME } from 'mailer';
import ms from 'ms';

@ApiPath({
  path: '/auth',
  name: 'Auth',
  security: { basicAuth: [] },
})
@controller('/auth')
export class AuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  private authService: AuthService;
  private authPolicy: AuthPolicy;
  private logger;
  private mailService: MailService;

  constructor(
    @inject(TYPES.AuthService) authService: AuthService,
    @inject(TYPES.AuthPolicy) authPolicy: AuthPolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory,
    @inject(MailerTypes.MailService) mailService: MailService
  ) {
    super();
    this.authService = authService;
    this.authPolicy = authPolicy;
    this.mailService = mailService;
    this.logger = loggerFactory.createLogger('AuthController');
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
    this.logger.info('Auth module is working!');
    return this.json({ message: 'Auth module is working!' }, 200);
  }

  /**
   * Register User
   * @param req
   * @param res
   * @returns
   */
  @ApiOperationPost(openAPI.register)
  @httpPost('/register', ValidationMiddleware.validate(authValidator.register))
  public async register(req: Request) {
    try {
      const reqData = await this.authPolicy.register(req);
      const user = await this.authService.register(reqData);

      await this.mailService.sendEmail({
        to: user.email,
        subject: 'Welcome',
        template: TEMPLATE_NAME.WELCOME,
        dynamicData: {
          FIRST_NAME: `${user.firstName} ${user.lastName}`,
          ORG_NAME: 'BigStepTech',
        },
      });
      return this.json({ data: user, message: 'Registered Successfully' }, 200);
    } catch (error) {
      if (error.message === 'Email already exists') {
        return this.json({ message: 'Email already exists' }, 400);
      } else {
        console.error('Registration failed:', error);
        return this.json({ message: 'Internal Server Error' }, 500);
      }
    }
  }

  /**
   * Login User
   * @param req
   * @param res
   * @returns
   */
  @ApiOperationPost(openAPI.login)
  @httpPost('/login', ValidationMiddleware.validate(authValidator.login))
  public async login(req: Request) {
    const { email, password } = await this.authPolicy.login(req);
    const token = await this.authService.login(email, password);
    return this.json({ data: token, message: 'Login Sucessfully' }, 200);
  }

  @ApiOperationPost(openAPI.forgetPassword)
  @httpPost(
    '/forgot_password',
    ValidationMiddleware.validate(authValidator.forgotPassword)
  )
  public async forgotPassword(req: Request) {
    const user = await this.authPolicy.forgotPassword(req);
    const token = this.authService.forgotPassword(user.id);
    await this.mailService.sendEmail({
      to: user.email,
      subject: 'Reset Password',
      template: TEMPLATE_NAME.RESET_PASSWORD,
      dynamicData: {
        FIRST_NAME: `${user.UserProfile[0].firstName} ${user.UserProfile[0].lastName}`,
        ORG_NAME: 'BigStepTech',
        RESET_PASSWORD_LINK: `${process.env.WEB_URL}}/verifyaccount/${token}`,
      },
    });
    return this.json(
      {
        message: 'Email Sent to reset your password',
      },
      200
    );
  }

  @ApiOperationPost(openAPI.resetPassword)
  @httpPost(
    '/reset_password',
    ValidationMiddleware.validate(authValidator.resetPassword)
  )
  public async resetPassword(req: Request) {
    const expirty = ms(process.env.RESET_PASSWORD_EXPIRY);

    const user = await this.authPolicy.resetPassword(req, expirty);

    await this.authService.resetPassword(user.id, req.body.password);

    return this.json(200).json({
      message: 'Password Reset Successfully',
    });
  }
}

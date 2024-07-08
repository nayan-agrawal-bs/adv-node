import { Container } from 'inversify';

import { authModule } from './auth_module';
import { userModule } from './user_module';
import { roleModule } from './role_module';

import { loggingModule } from 'logger';

import {
  authStrategyModule,
  BearerStrategy,
  AuthStrategyTypes,
  AuthStrategyFactory,
} from 'auth-strategies';

import { prismaClientModule } from 'clients-db';
import { PermissionMiddleware } from '../shared/middlewares/permission.middleware';
import { ValidationMiddleware } from '../shared/middlewares/validator.middleware';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';

const mainContainer = new Container();

mainContainer.load(prismaClientModule);
mainContainer.load(authModule);
mainContainer.load(loggingModule);
mainContainer.load(userModule);
mainContainer.load(authStrategyModule);
mainContainer.load(roleModule);

mainContainer
  .bind<PermissionMiddleware>('PermissionMiddleware')
  .to(PermissionMiddleware);
mainContainer
  .bind<ValidationMiddleware>('ValidationMiddleware')
  .to(ValidationMiddleware);

const authStrategy = mainContainer.get<AuthStrategyFactory>(
  AuthStrategyTypes.StrategyFactory
);

const bearerStrategy = new BearerStrategy('jwtsecret');
authStrategy.register('Bearer', bearerStrategy);

mainContainer
  .bind<AuthMiddleware>('BearerAuthMiddleware')
  .toDynamicValue(() => {
    return new AuthMiddleware(authStrategy.get('Bearer'));
  });

export { mainContainer };

import { ContainerModule } from 'inversify';
import { UserService } from './services/user.service';
import { TYPES } from './types';
import { UserPolicy } from './policies/user.policy';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { interfaces, TYPE } from 'inversify-express-utils';

const userModule = new ContainerModule((bind): void => {
  bind<interfaces.Controller>(TYPE.Controller)
    .to(UserController)
    .inRequestScope()
    .whenTargetNamed(TYPES.UserController);

  bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
  bind<UserPolicy>(TYPES.UserPolicy).to(UserPolicy).inSingletonScope();
  bind<UserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
});

export { userModule };

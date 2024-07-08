import { ContainerModule } from 'inversify';
import { AuthService } from './services/auth.service';
import { TYPES } from '../auth_module/types';
import { AuthPolicy } from './policies/auth.policy';
import { AuthRepository } from './repositories/auth.repository';
import { AuthController } from './controllers/auth.controller';

const authModule = new ContainerModule((bind): void => {
  bind<AuthController>(TYPES.AuthController).to(AuthController);
  bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
  bind<AuthPolicy>(TYPES.AuthPolicy).to(AuthPolicy).inSingletonScope();
  bind<AuthRepository>(TYPES.AuthRepository)
    .to(AuthRepository)
    .inSingletonScope();
});

export { authModule };

import { ContainerModule } from 'inversify';
import { EstateService } from './services/estate.service';
import { TYPES } from './types';
import { EstatePolicy } from './policies/estate.policy';
import { EstateRepository } from './repositories/estate.repository';
import { EstateController } from './controllers/estate.controller';

const estateModule = new ContainerModule((bind): void => {
  bind<EstateController>(TYPES.EstateController).to(EstateController);
  bind<EstateService>(TYPES.EstateService).to(EstateService).inSingletonScope();
  bind<EstatePolicy>(TYPES.EstatePolicy).to(EstatePolicy).inSingletonScope();
  bind<EstateRepository>(TYPES.EstateRepository)
    .to(EstateRepository)
    .inSingletonScope();
});

export { estateModule };

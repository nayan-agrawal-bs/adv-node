import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
  requestParam,
  BaseHttpController,
} from 'inversify-express-utils';

import { EstateService } from '../services/estate.service';
import { EstatePolicy } from '../policies/estate.policy';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import {
  idParamValidation,
  postCreate,
  searchValidator,
} from '../validators/index.chain';

@controller('/estate')
export class EstateController extends BaseHttpController {
  private estateService: EstateService;
  private estatePolicy: EstatePolicy;
  private logger;

  constructor(
    @inject(TYPES.EstateService)
    estateService: EstateService,
    @inject(TYPES.EstatePolicy)
    estatePolicy: EstatePolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.estateService = estateService;
    this.estatePolicy = estatePolicy;
    this.logger = loggerFactory.createLogger('EstateController');
  }

  @httpPost('/', ValidationMiddleware.validate(postCreate))
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = this.estatePolicy.createDto(req);
      const result = await this.estateService.create(dto);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  public async update(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = this.estatePolicy.updateDto(req);
      const result = await this.estateService.update(id, dto);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  public async getById(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.estateService.findById(id);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  public async delete(
    @requestParam('id') id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.estateService.delete(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/search', ValidationMiddleware.validate(searchValidator))
  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const name = (req.query.name as string) || '';
      const result = await this.estateService.searchByName(name);

      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/filter')
  public async filter(req: Request, res: Response, next: NextFunction) {
    try {
      const location = req.query.location as string; // Cast query parameter to string
      const result = await this.estateService.filterByLocation(location);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }
}

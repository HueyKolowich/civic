import { Container } from 'inversify';
import { TYPES } from './types';
import { IssueRepositoryInterface } from './repositories/IssueRepositoryInterface';
import { IssueRepository } from './repositories/IssueRepository';
import { IssueServiceInterface } from './services/IssueServiceInterface';
import { IssueService } from './services/IssueService';
import { PositionController } from './controllers/PositionController';
import { PositionServiceInterface } from './services/PositionServiceInterface';
import { PositionService } from './services/PositionService';
import { PositionRepositoryInterface } from './repositories/PositionRepositoryInterface';
import { PositionRepository } from './repositories/PositionRepository';

const container = new Container();

container
    .bind<IssueRepositoryInterface>(TYPES.IssueRepositoryInterface)
    .to(IssueRepository);
container
    .bind<IssueServiceInterface>(TYPES.IssueServiceInterface)
    .to(IssueService);
container
    .bind<PositionRepositoryInterface>(TYPES.PositionRepositoryInterface)
    .to(PositionRepository);
container
    .bind<PositionServiceInterface>(TYPES.PositionServiceInterface)
    .to(PositionService);
container.bind<PositionController>(PositionController).toSelf();

export default container;

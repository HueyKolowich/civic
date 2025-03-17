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
import { ObserverInterface } from './services/observation/observers/ObserverInterface';
import { PositionsObserver } from './services/observation/observers/PositionsObsever';

const container = new Container();

// Repositories
container
    .bind<IssueRepositoryInterface>(TYPES.IssueRepositoryInterface)
    .to(IssueRepository);
container
    .bind<PositionRepositoryInterface>(TYPES.PositionRepositoryInterface)
    .to(PositionRepository);

// Services
container
    .bind<IssueServiceInterface>(TYPES.IssueServiceInterface)
    .to(IssueService);
container
    .bind<PositionServiceInterface>(TYPES.PositionServiceInterface)
    .to(PositionService);

// Controllers
container.bind<PositionController>(PositionController).toSelf();
container.bind<QuizController>(QuizController).toSelf();

// Observers
container
    .bind<ObserverInterface>(TYPES.ObserverInterface)
    .to(PositionsObserver);

export default container;

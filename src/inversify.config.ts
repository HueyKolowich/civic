import { Container } from 'inversify';
import { TYPES } from './types';

import { ObserverInterface } from './services/observation/observers/ObserverInterface';
import { PositionsObserver } from './services/observation/observers/PositionsObsever';

import { QuizController } from './controllers/QuizController';
import { IssueServiceInterface } from './services/IssueServiceInterface';
import { IssueService } from './services/IssueService';
import { IssueRepositoryInterface } from './repositories/IssueRepositoryInterface';
import { IssueRepository } from './repositories/IssueRepository';

import { PositionController } from './controllers/PositionController';
import { PositionServiceInterface } from './services/PositionServiceInterface';
import { PositionService } from './services/PositionService';
import { PositionRepositoryInterface } from './repositories/PositionRepositoryInterface';
import { PositionRepository } from './repositories/PositionRepository';

import { AffinityServiceInterface } from './services/AffinityServiceInterface';
import { AffinityService } from './services/AffinityService';
import { AffinityRepositoryInterface } from './repositories/AffinityRepositoryInterface';
import { AffinityRepository } from './repositories/AffinityRepository';

import { CandidateServiceInterface } from './services/CandidateServiceInterface';
import { CandidateService } from './services/CandidateService';
import { CandidateRepositoryInterface } from './repositories/CandidateRepositoryInterface';
import { CandidateRepository } from './repositories/CandidateRepository';

const container = new Container();

// Repositories
container
    .bind<IssueRepositoryInterface>(TYPES.IssueRepositoryInterface)
    .to(IssueRepository);
container
    .bind<PositionRepositoryInterface>(TYPES.PositionRepositoryInterface)
    .to(PositionRepository);
container
    .bind<AffinityRepositoryInterface>(TYPES.AffinityRepositoryInterface)
    .to(AffinityRepository);
container
    .bind<CandidateRepositoryInterface>(TYPES.CandidateRepositoryInterface)
    .to(CandidateRepository);

// Services
container
    .bind<IssueServiceInterface>(TYPES.IssueServiceInterface)
    .to(IssueService);
container
    .bind<PositionServiceInterface>(TYPES.PositionServiceInterface)
    .to(PositionService);
container
    .bind<AffinityServiceInterface>(TYPES.AffinityServiceInterface)
    .to(AffinityService);
container
    .bind<CandidateServiceInterface>(TYPES.CandidateServiceInterface)
    .to(CandidateService);

// Controllers
container.bind<PositionController>(PositionController).toSelf();
container.bind<QuizController>(QuizController).toSelf();

// Observers
container
    .bind<ObserverInterface>(TYPES.ObserverInterface)
    .to(PositionsObserver);

export default container;

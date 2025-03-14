import { Container } from 'inversify';
import { TYPES } from './types';
import { IssueRepositoryInterface } from './repositories/IssueRepositoryInterface';
import { IssueRepository } from './repositories/IssueRepository';
import { IssueServiceInterface } from './services/IssueServiceInterface';
import { IssueService } from './services/IssueService';
import { IssueController } from './controllers/IssueController';

const container = new Container();

container
    .bind<IssueRepositoryInterface>(TYPES.IssueRepositoryInterface)
    .to(IssueRepository);
container
    .bind<IssueServiceInterface>(TYPES.IssueServiceInterface)
    .to(IssueService);
container.bind<IssueController>(IssueController).toSelf();

export default container;

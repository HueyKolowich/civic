import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from './IssueServiceInterface';
import { IssueRepositoryInterface } from '../repositories/IssueRepositoryInterface';
import { TYPES } from '../types';
import { Issue } from '../models/Issue';
import { IssueDto } from '../models/dto/Issue';

@injectable()
export class IssueService implements IssueServiceInterface {
    constructor(
        @inject(TYPES.IssueRepositoryInterface)
        private issueRepository: IssueRepositoryInterface
    ) {}

    async consolidateIssues(possibleIssues: IssueDto[]): Promise<Issue[]> {
        console.log('Consolidating issues...');

        return [];
    }
}

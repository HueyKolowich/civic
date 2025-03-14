import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from './IssueServiceInterface';
import { IssueRepositoryInterface } from '../repositories/IssueRepositoryInterface';
import { TYPES } from '../types';
import { Issue } from '../models/Issue';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IssueDto } from '../models/dto/Issue';

@injectable()
export class IssueService implements IssueServiceInterface {
    constructor(
        @inject(TYPES.IssueRepositoryInterface)
        private issueRepository: IssueRepositoryInterface
    ) {}

    async createIssues(data: any): Promise<Issue[]> {
        const issuesData = Array.isArray(data) ? data : [data];

        const validatedData = await Promise.all(
            issuesData.map(
                async (issue: any) => await this.validateIssue(issue)
            )
        );

        const createdIssues = await Promise.all(
            validatedData.map((validIssue) =>
                this.issueRepository.createIssue(validIssue)
            )
        );

        return createdIssues;
    }

    private async validateIssue(issue: any): Promise<IssueDto> {
        const dto = plainToInstance(IssueDto, issue);

        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }

        return dto;
    }
}

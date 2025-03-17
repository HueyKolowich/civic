import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from './IssueServiceInterface';
import { IssueRepositoryInterface } from '../repositories/IssueRepositoryInterface';
import { TYPES } from '../types';
import { Issue } from '../models/Issue';
import { PositionServiceInterface } from './PositionServiceInterface';
import { IssueDto } from '../models/dto/Issue';
import { plainToInstance } from 'class-transformer';

@injectable()
export class IssueService implements IssueServiceInterface {
    constructor(
        @inject(TYPES.IssueRepositoryInterface)
        private issueRepository: IssueRepositoryInterface,
        @inject(TYPES.PositionServiceInterface)
        private positionService: PositionServiceInterface
    ) {}

    async consolidateIssues(level: string, level_id: number): Promise<Issue[]> {
        const positions = await this.positionService.getPositions(
            level,
            level_id
        );

        // Here we need to build out a better way to consolidate issues
        const issues = positions.map((position) => {
            const raw = {
                level,
                level_id,
                description: position.issue,
            };

            const dto = plainToInstance(IssueDto, raw);

            return dto;
        });

        const createdIssues = await this.issueRepository.updateIssues(issues);

        return createdIssues;
    }
}

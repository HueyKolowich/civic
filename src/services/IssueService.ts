import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from './IssueServiceInterface';
import { IssueRepositoryInterface } from '../repositories/IssueRepositoryInterface';
import { TYPES } from '../types';
import { PositionServiceInterface } from './PositionServiceInterface';
import { IssueDto } from '../models/dto/Issue';
import { plainToInstance } from 'class-transformer';
import { AffinityServiceInterface } from './AffinityServiceInterface';
import { AffinityDto } from '../models/dto/Affinity';

@injectable()
export class IssueService implements IssueServiceInterface {
    constructor(
        @inject(TYPES.IssueRepositoryInterface)
        private issueRepository: IssueRepositoryInterface,
        @inject(TYPES.PositionServiceInterface)
        private positionService: PositionServiceInterface,
        @inject(TYPES.AffinityServiceInterface)
        private affinityService: AffinityServiceInterface
    ) {}

    async consolidateIssues(level: string, level_id: number) {
        const positions = await this.positionService.getPositions(
            level,
            level_id
        );

        const issueDtos = positions.map((position) =>
            plainToInstance(IssueDto, {
                level,
                level_id,
                description: position.issue,
            })
        );

        const issues = await this.issueRepository.updateIssues(issueDtos);

        /**
         * Eventually this approach will no longer work once the issues
         * are truely consolidated and the indices no longer match the
         * indices of the positions.
         */
        const affinityDtos = positions.map((position, index) =>
            plainToInstance(AffinityDto, {
                actor_type: 'candidate',
                actor_id: position.candidate_id,
                issue_id: issues[index].issue_id,
                position: position.position,
            })
        );

        await this.affinityService.createAffinities(affinityDtos);
    }

    async getIssues(
        level: string,
        level_id: number
    ): Promise<{ issue_id: number; description: string }[]> {
        const issues = await this.issueRepository.getIssuesByLevelId(
            level,
            level_id
        );

        return issues.map((issue) => ({
            issue_id: issue.issue_id,
            description: issue.description,
        }));
    }
}

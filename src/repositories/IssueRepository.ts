import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Issue } from '../models/Issue';
import { IssueRepositoryInterface } from './IssueRepositoryInterface';
import { dataSource } from '../db/config';
import { IssueDto } from '../models/dto/Issue';

@injectable()
export class IssueRepository implements IssueRepositoryInterface {
    private repo: Repository<Issue>;

    constructor() {
        this.repo = dataSource.getRepository(Issue);
    }

    async updateIssues(issues: IssueDto[]): Promise<Issue[]> {
        this.repo.delete({
            level: issues[0].level,
            level_id: issues[0].level_id,
        });
        const createdIssues = this.repo.create(issues);
        return await this.repo.save(createdIssues);
    }

    async getIssuesByLevelId(
        level: string,
        level_id: number
    ): Promise<Issue[]> {
        return await this.repo.find({
            where: { level: level, level_id: level_id },
        });
    }
}

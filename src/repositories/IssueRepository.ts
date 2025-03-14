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

    async createIssue(data: IssueDto): Promise<Issue> {
        const issue = this.repo.create(data);
        return await this.repo.save(issue);
    }
}

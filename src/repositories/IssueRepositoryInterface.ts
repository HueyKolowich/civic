import { IssueDto } from '../models/dto/Issue';
import { Issue } from '../models/Issue';

export interface IssueRepositoryInterface {
    createIssue(data: IssueDto): Promise<Issue>;
}

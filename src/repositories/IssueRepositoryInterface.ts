import { IssueDto } from '../models/dto/Issue';
import { Issue } from '../models/Issue';

export interface IssueRepositoryInterface {
    updateIssues(issues: IssueDto[]): Promise<Issue[]>;
}

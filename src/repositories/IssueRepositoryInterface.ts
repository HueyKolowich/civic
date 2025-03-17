import { IssueDto } from '../models/dto/Issue';
import { Issue } from '../models/Issue';

export interface IssueRepositoryInterface {
    updateIssues(issues: IssueDto[]): Promise<Issue[]>;
    getIssuesByLevelId(level: string, level_id: number): Promise<Issue[]>;
}

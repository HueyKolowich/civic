import { IssueDto } from '../models/dto/Issue';
import { Issue } from '../models/Issue';

export interface IssueServiceInterface {
    consolidateIssues(level: string, level_id: number): Promise<void>;
    getIssues(level: string, level_id: number): Promise<IssueDto[]>;
}

import { Issue } from '../models/Issue';

export interface IssueServiceInterface {
    createIssues(data: any): Promise<Issue[]>;
}

import { IssueDto } from '../models/dto/Issue';
import { Issue } from '../models/Issue';

export interface IssueServiceInterface {
    consolidateIssues(possibleIssues: IssueDto[]): Promise<Issue[]>;
}

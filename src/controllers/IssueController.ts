import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from '../services/IssueServiceInterface';
import { TYPES } from '../types';

@injectable()
export class IssueController {
    constructor(
        @inject(TYPES.IssueServiceInterface)
        private issueService: IssueServiceInterface
    ) {}

    async createIssues(req: any, res: any) {
        try {
            const issue = await this.issueService.createIssues(req.body.issues);
            return res.status(201).json(issue);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

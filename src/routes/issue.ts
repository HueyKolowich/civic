import { Router } from 'express';
import container from '../inversify.config';
import { IssueController } from '../controllers/IssueController';

const issuesRouter = Router();
const issueController = container.get<IssueController>(IssueController);

issuesRouter.post('/', issueController.createIssues.bind(issueController));

export default issuesRouter;

import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IssueServiceInterface } from '../services/IssueServiceInterface';

@injectable()
export class QuizController {
    constructor(
        @inject(TYPES.IssueServiceInterface)
        private issueService: IssueServiceInterface
    ) {}

    async getQuiz(req: any, res: any) {
        try {
            const { level, level_id } = req.query;

            this.validateLevelId(level, level_id);

            const quiz = await this.issueService.getIssues(level, level_id);

            return res.status(200).json(quiz);
        } catch (error: any) {
            if (error.message.includes('Validation failed')) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    private validateLevelId(level: string, level_id: number) {
        if (!level || !level_id) {
            throw new Error(`Validation failed: missing required fields`);
        }
    }
}

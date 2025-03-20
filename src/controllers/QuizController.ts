import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IssueServiceInterface } from '../services/IssueServiceInterface';
import { AffinityDto } from '../models/dto/Affinity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AffinityServiceInterface } from '../services/AffinityServiceInterface';

@injectable()
export class QuizController {
    constructor(
        @inject(TYPES.IssueServiceInterface)
        private issueService: IssueServiceInterface,
        @inject(TYPES.AffinityServiceInterface)
        private affinityService: AffinityServiceInterface
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

    async calculateQuizResults(req: any, res: any) {
        try {
            const responsesData = Array.isArray(req.body.responses)
                ? req.body.responses
                : [req.body.responses];

            const validatedResponses = await Promise.all(
                responsesData.map(
                    async (response: any) =>
                        await this.validateResponse(response)
                )
            );

            const quizResult = await this.affinityService.checkAffinities(
                validatedResponses
            );

            return res.status(200).json(quizResult);
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

    private async validateResponse(response: any): Promise<AffinityDto> {
        const dto = plainToInstance(AffinityDto, response);

        const errors = await validate(dto, { skipUndefinedProperties: true });
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }

        return dto;
    }
}

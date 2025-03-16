import { inject, injectable } from 'inversify';
import { IssueServiceInterface } from '../services/IssueServiceInterface';
import { TYPES } from '../types';
import { PositionServiceInterface } from '../services/PositionServiceInterface';

@injectable()
export class PositionController {
    constructor(
        @inject(TYPES.PositionServiceInterface)
        private positionService: PositionServiceInterface
    ) {}

    async createPositions(req: any, res: any) {
        try {
            const positions = await this.positionService.createPositions(
                req.body.positions
            );
            return res.status(201).json(positions);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

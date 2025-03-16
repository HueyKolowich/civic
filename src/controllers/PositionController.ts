import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PositionServiceInterface } from '../services/PositionServiceInterface';
import { PositionDto } from '../models/dto/Position';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@injectable()
export class PositionController {
    constructor(
        @inject(TYPES.PositionServiceInterface)
        private positionService: PositionServiceInterface
    ) {}

    async createPositions(req: any, res: any) {
        try {
            const positionsData = Array.isArray(req.body.positions)
                ? req.body.positions
                : [req.body.positions];

            const validatedPositions = await Promise.all(
                positionsData.map(
                    async (position: any) =>
                        await this.validatePosition(position)
                )
            );

            const positions = await this.positionService.createPositions(
                validatedPositions
            );

            return res.status(201).json(positions);
        } catch (error: any) {
            if (error.message.includes('Validation failed')) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    private async validatePosition(position: any): Promise<PositionDto> {
        const dto = plainToInstance(PositionDto, position);

        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }

        return dto;
    }
}

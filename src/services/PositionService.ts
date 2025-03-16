import { inject, injectable } from 'inversify';
import { Position } from '../models/Position';
import { PositionServiceInterface } from './PositionServiceInterface';
import { PositionRepositoryInterface } from '../repositories/PositionRepositoryInterface';
import { TYPES } from '../types';
import { PositionDto } from '../models/dto/Position';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@injectable()
export class PositionService implements PositionServiceInterface {
    constructor(
        @inject(TYPES.PositionRepositoryInterface)
        private positionRepository: PositionRepositoryInterface
    ) {}

    async createPositions(data: any): Promise<Position[]> {
        const positionsData = Array.isArray(data) ? data : [data];

        const validatedData = await Promise.all(
            positionsData.map(
                async (position: any) => await this.validatePosition(position)
            )
        );

        const createdPositions = await Promise.all(
            validatedData.map((validPosition) =>
                this.positionRepository.createPosition(validPosition)
            )
        );

        return createdPositions;
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

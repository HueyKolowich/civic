import { inject, injectable } from 'inversify';
import { Position } from '../models/Position';
import { PositionServiceInterface } from './PositionServiceInterface';
import { PositionRepositoryInterface } from '../repositories/PositionRepositoryInterface';
import { TYPES } from '../types';
import { PositionDto } from '../models/dto/Position';

@injectable()
export class PositionService implements PositionServiceInterface {
    constructor(
        @inject(TYPES.PositionRepositoryInterface)
        private positionRepository: PositionRepositoryInterface
    ) {}

    async createPositions(positions: PositionDto[]): Promise<Position[]> {
        const createdPositions = await Promise.all(
            positions.map((position) =>
                this.positionRepository.createPosition(position)
            )
        );

        return createdPositions;
    }
}

import { inject, injectable } from 'inversify';
import { Position } from '../models/Position';
import { PositionServiceInterface } from './PositionServiceInterface';
import { PositionRepositoryInterface } from '../repositories/PositionRepositoryInterface';
import { TYPES } from '../types';
import { PositionDto } from '../models/dto/Position';
import { Subject } from './observation/Subject';

@injectable()
export class PositionService
    extends Subject
    implements PositionServiceInterface
{
    constructor(
        @inject(TYPES.PositionRepositoryInterface)
        private positionRepository: PositionRepositoryInterface
    ) {
        super();
    }

    async createPositions(positions: PositionDto[]): Promise<Position[]> {
        const createdPositions = await this.positionRepository.savePositions(
            positions
        );

        const data = {
            level: createdPositions[0].level,
            level_id: createdPositions[0].level_id,
        };

        this.notify(data);

        return createdPositions;
    }

    async getPositions(level: string, level_id: number): Promise<Position[]> {
        return this.positionRepository.getPositionsByLevelId(level, level_id);
    }
}

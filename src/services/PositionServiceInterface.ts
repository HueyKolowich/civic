import { PositionDto } from '../models/dto/Position';
import { Position } from '../models/Position';

export interface PositionServiceInterface {
    createPositions(positions: PositionDto[]): Promise<Position[]>;
    getPositions(level: string, level_id: number): Promise<Position[]>;
}

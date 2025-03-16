import { PositionDto } from '../models/dto/Position';
import { Position } from '../models/Position';

export interface PositionRepositoryInterface {
    savePositions(positions: PositionDto[]): Promise<Position[]>;
}

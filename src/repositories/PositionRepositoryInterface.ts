import { PositionDto } from '../models/dto/Position';
import { Position } from '../models/Position';

export interface PositionRepositoryInterface {
    createPosition(data: PositionDto): Promise<Position>;
}

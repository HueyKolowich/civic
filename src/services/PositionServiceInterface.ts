import { Position } from '../models/Position';

export interface PositionServiceInterface {
    createPositions(data: any): Promise<Position[]>;
}

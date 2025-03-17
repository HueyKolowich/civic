import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { dataSource } from '../db/config';
import { PositionRepositoryInterface } from './PositionRepositoryInterface';
import { PositionDto } from '../models/dto/Position';
import { Position } from '../models/Position';

@injectable()
export class PositionRepository implements PositionRepositoryInterface {
    private repo: Repository<Position>;

    constructor() {
        this.repo = dataSource.getRepository(Position);
    }

    async savePositions(positions: PositionDto[]): Promise<Position[]> {
        const createdPostions = this.repo.create(positions);
        return await this.repo.save(createdPostions);
    }

    async getPositionsByLevelId(
        level: string,
        level_id: number
    ): Promise<Position[]> {
        return await this.repo.find({
            where: { level: level, level_id: level_id },
        });
    }
}

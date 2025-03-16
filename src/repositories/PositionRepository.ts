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

    async createPosition(data: PositionDto): Promise<Position> {
        const position = this.repo.create(data);
        return await this.repo.save(position);
    }
}

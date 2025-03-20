import { injectable } from 'inversify';
import { AffinityRepositoryInterface } from './AffinityRepositoryInterface';
import { AffinityDto } from '../models/dto/Affinity';
import { Affinity } from '../models/Affinity';
import { Repository } from 'typeorm';
import { dataSource } from '../db/config';

@injectable()
export class AffinityRepository implements AffinityRepositoryInterface {
    private repo: Repository<Affinity>;

    constructor() {
        this.repo = dataSource.getRepository(Affinity);
    }

    async saveAffinities(affinities: AffinityDto[]): Promise<Affinity[]> {
        const createdAffinities = this.repo.create(affinities);
        return await this.repo.save(createdAffinities);
    }

    async getAffinities(
        issue_id: number,
        actor_type: string
    ): Promise<Affinity[]> {
        return await this.repo.find({
            where: { issue_id: issue_id, actor_type: actor_type },
        });
    }
}

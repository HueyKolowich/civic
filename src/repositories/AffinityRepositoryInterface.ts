import { Affinity } from '../models/Affinity';
import { AffinityDto } from '../models/dto/Affinity';

export interface AffinityRepositoryInterface {
    saveAffinities(affinities: AffinityDto[]): Promise<Affinity[]>;
    getAffinities(issue_id: number, actor_type: string): Promise<Affinity[]>;
}

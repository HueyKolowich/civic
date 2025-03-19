import { Affinity } from '../models/Affinity';
import { AffinityDto } from '../models/dto/Affinity';

export interface AffinityRepositoryInterface {
    saveAffinities(affinities: AffinityDto[]): Promise<Affinity[]>;
}

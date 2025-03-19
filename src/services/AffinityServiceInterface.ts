import { Affinity } from '../models/Affinity';
import { AffinityDto } from '../models/dto/Affinity';

export interface AffinityServiceInterface {
    createAffinities(affinities: AffinityDto[]): Promise<Affinity[]>;
}

import { plainToInstance } from 'class-transformer';
import { Affinity } from '../models/Affinity';
import { AffinityDto } from '../models/dto/Affinity';
import { AffinityRepositoryInterface } from '../repositories/AffinityRepositoryInterface';
import { TYPES } from '../types';
import { AffinityServiceInterface } from './AffinityServiceInterface';
import { inject, injectable } from 'inversify';

@injectable()
export class AffinityService implements AffinityServiceInterface {
    constructor(
        @inject(TYPES.AffinityRepositoryInterface)
        private affinityRepository: AffinityRepositoryInterface
    ) {}

    /**
     * Will need to do nlp to determine from the affinityDto.position
     * what the affinityDto.affinity [-1.0, 1.0] should be.
     *
     * For now, all are hard-coded to be 1.0
     */
    async createAffinities(affinities: AffinityDto[]): Promise<Affinity[]> {
        const transformedAffinities = affinities.map((affinity) =>
            plainToInstance(AffinityDto, {
                ...affinity,
                affinity: 1.0,
            })
        );

        return await this.affinityRepository.saveAffinities(
            transformedAffinities
        );
    }
}

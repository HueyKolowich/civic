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

    async checkAffinities(
        affinities: AffinityDto[]
    ): Promise<{ candidate_id: number; score: number }> {
        const candidateAffinities = await Promise.all(
            affinities.map(
                async (affinity) =>
                    await this.affinityRepository.getAffinities(
                        affinity.issue_id,
                        'candidate'
                    )
            )
        );

        const candidateScores: { [candidate_id: number]: number } = {};
        const candidateMaxScores: { [candidate_id: number]: number } = {};

        for (let i = 0; i < affinities.length; i++) {
            const voterAffinity = affinities[i].affinity;
            const candidatesForIssue = candidateAffinities[i];

            for (const candidate of candidatesForIssue) {
                const scoreContribution = voterAffinity * candidate.affinity;

                candidateScores[candidate.actor_id] =
                    (candidateScores[candidate.actor_id] || 0) +
                    scoreContribution;
                candidateMaxScores[candidate.actor_id] =
                    (candidateMaxScores[candidate.actor_id] || 0) + 1;
            }
        }

        let bestCandidateId: number = -1;
        let bestScore: number = -Infinity;
        let bestAgreementPercentage: number = 0;

        for (const candidateId in candidateScores) {
            const actualScore = candidateScores[candidateId];
            const maxPossibleScore = candidateMaxScores[candidateId];

            const agreementPercentage =
                maxPossibleScore > 0
                    ? (actualScore / maxPossibleScore) * 100
                    : 0;

            if (actualScore > bestScore) {
                bestScore = actualScore;
                bestCandidateId = Number(candidateId);
                bestAgreementPercentage = agreementPercentage;
            }
        }

        return {
            candidate_id: bestCandidateId,
            score: bestAgreementPercentage,
        };
    }
}

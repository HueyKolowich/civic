import { inject, injectable } from 'inversify';
import { CandidateServiceInterface } from './CandidateServiceInterface';
import { TYPES } from '../types';
import { CandidateRepositoryInterface } from '../repositories/CandidateRepositoryInterface';

@injectable()
export class CandidateService implements CandidateServiceInterface {
    constructor(
        @inject(TYPES.CandidateRepositoryInterface)
        private candidateRepository: CandidateRepositoryInterface
    ) {}

    async getCandidateName(candidate_id: number): Promise<string> {
        const candidate = await this.candidateRepository.getCandidate(
            candidate_id
        );

        return candidate.name;
    }
}

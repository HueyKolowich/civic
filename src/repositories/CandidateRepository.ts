import { injectable } from 'inversify';
import { CandidateRepositoryInterface } from './CandidateRepositoryInterface';
import { Candidate } from '../models/Candidate';
import { Repository } from 'typeorm';
import { dataSource } from '../db/config';

@injectable()
export class CandidateRepository implements CandidateRepositoryInterface {
    private repo: Repository<Candidate>;

    constructor() {
        this.repo = dataSource.getRepository(Candidate);
    }

    async getCandidate(candidate_id: number): Promise<Candidate> {
        return await this.repo.findOneOrFail({
            where: { candidate_id: candidate_id },
        });
    }
}

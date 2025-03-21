import { Candidate } from '../models/Candidate';

export interface CandidateRepositoryInterface {
    getCandidate(candidate_id: number): Promise<Candidate>;
}

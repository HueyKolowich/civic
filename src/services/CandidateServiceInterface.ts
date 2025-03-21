export interface CandidateServiceInterface {
    getCandidateName(candidate_id: number): Promise<string>;
}

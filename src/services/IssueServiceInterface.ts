export interface IssueServiceInterface {
    consolidateIssues(level: string, level_id: number): Promise<void>;
    getIssues(
        level: string,
        level_id: number
    ): Promise<{ issue_id: number; description: string }[]>;
}

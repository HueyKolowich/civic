import { inject, injectable } from 'inversify';
import { ObserverInterface } from './ObserverInterface';
import { TYPES } from '../../../types';
import { IssueServiceInterface } from '../../IssueServiceInterface';

@injectable()
export class PositionsObserver implements ObserverInterface {
    constructor(
        @inject(TYPES.IssueServiceInterface)
        private issueService: IssueServiceInterface
    ) {}

    update(): void {
        this.issueService.consolidateIssues([]);
    }
}

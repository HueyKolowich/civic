import container from '../../inversify.config';
import { TYPES } from '../../types';
import { ObserverInterface } from './observers/ObserverInterface';
import { PositionService } from '../PositionService';

export class ObservationalRelationshipManager {
    public static init(): void {
        const positionsObserver: ObserverInterface =
            container.get<ObserverInterface>(TYPES.PositionsObserver);
        PositionService.attach(positionsObserver);
    }
}

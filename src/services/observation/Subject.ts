import { ObserverInterface } from './observers/ObserverInterface';

export abstract class Subject {
    static observers: Set<ObserverInterface> = new Set();

    static attach(observer: ObserverInterface): void {
        Subject.observers.add(observer);
    }

    protected notify(data: any): void {
        Subject.observers.forEach((observer) => {
            setImmediate(() => {
                try {
                    observer.update(data);
                } catch (error) {
                    console.error('Observer update failed:', error);
                }
            });
        });
    }
}

import { ObserverInterface } from './observers/ObserverInterface';

export abstract class Subject {
    static observers: Set<ObserverInterface> = new Set();

    static attach(observer: ObserverInterface): void {
        Subject.observers.add(observer);
    }

    protected notify(): void {
        Subject.observers.forEach((observer) => {
            setImmediate(() => {
                try {
                    observer.update();
                } catch (error) {
                    console.error('Observer update failed:', error);
                }
            });
        });
    }
}

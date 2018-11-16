export declare class Event<TArgs> {
    listeners: Array<(args: TArgs) => void>;
    constructor(name: string);
    subscribe(fn: ((args: TArgs) => void)): void;
    trigger(args: TArgs): void;
    unsubscribe(fn: ((args: TArgs) => void)): void;
}

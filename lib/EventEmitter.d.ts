export default class {
    private CustomEvent;
    private listeners;
    constructor(EventClass?: any);
    on(element: Element, eventName: string, listener: EventListener, doAfterEmit?: Function): void;
    one(element: Element, eventName: string, listener: EventListener): void;
    off(element: Element, eventName: string, listener: EventListener): void;
    emit(element: Element, eventName: string, ...args: any[]): boolean;
}

export default class {
    private CustomEvent;
    registry: any;
    constructor(EventClass?: any);
    private addEventListener;
    on(element: Element, eventName: string, listener: EventListener, options?: AddEventListenerOptions): void;
    one(element: Element, eventName: string, listener: EventListener, options?: AddEventListenerOptions): void;
    off(element: Element, eventName: string, listener: EventListener, options?: EventListenerOptions): void;
    dispatch(element: Element | Document | Window, eventName: string, ...args: any[]): boolean;
}

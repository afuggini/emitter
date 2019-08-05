export default class {
    private events;
    constructor();
    on(event: string, listener: Function): () => void;
    one(event: string, listener: Function): () => void;
    off(event: string, listener: Function): void;
    emit(event: string, ...args: any[]): void;
}

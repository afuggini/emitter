export default class {
  private CustomEvent

  // Register events to call once
  // for compatibility with IE
  public registry

  constructor (EventClass = global['CustomEvent']) {
    this.CustomEvent = EventClass
    this.registry = {}
  }

  private addEventListener (element: Element, eventName: string, listener: EventListener, options?: AddEventListenerOptions) {
    return element.addEventListener(eventName, (event: CustomEvent) => {
      Array.isArray(event.detail) ? listener.apply(null, event.detail) : listener(event)
    }, options || false)
  }

  public on (element: Element, eventName: string, listener: EventListener, options?: AddEventListenerOptions) {
    if (this.registry[eventName]) delete this.registry[eventName]
    return this.addEventListener(element, eventName, listener, options)
  }

  public one (element: Element, eventName: string, listener: EventListener, options?: AddEventListenerOptions) {
    this.registry[eventName] = 1
    return this.addEventListener(element, eventName, listener, options)
  }

  public off (element: Element, eventName: string, listener: EventListener, options?: EventListenerOptions) {
    return element.removeEventListener(eventName, listener, options || false)
  }

  public dispatch (element: Element | Document | Window, eventName: string, ...args) {
    if (this.registry[eventName] === 0) return
    const event = new this.CustomEvent(eventName, { detail: args })
    const dispatched = element.dispatchEvent(event)
    if (this.registry[eventName]) this.registry[eventName] = 0
    return dispatched
  }
}

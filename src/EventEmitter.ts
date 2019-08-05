export default class {
  private CustomEvent
  private listeners

  constructor (EventClass = global['CustomEvent']) {
    this.CustomEvent = EventClass
    this.listeners = {}
  }

  public on (element: Element, eventName: string, listener: EventListener, doAfterEmit?: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(element)
    return element.addEventListener(eventName, (event: CustomEvent) => {
      doAfterEmit && doAfterEmit()
      listener.apply(null, event.detail)
    }, false)
  }

  public one (element: Element, eventName: string, listener: EventListener) {
    const doAfterEmit = () => this.off(element, eventName, listener)
    return this.on(element, eventName, listener, doAfterEmit)
  }

  public off (element: Element, eventName: string, listener: EventListener) {
    if (!this.listeners[eventName]) return
    const index = this.listeners[eventName].indexOf(element)
    if (index === -1) return
    this.listeners[eventName].splice(index, 1)
    return element.removeEventListener(eventName, listener, false)
  }

  public emit (element: Element, eventName: string, ...args) {
    if (!this.listeners[eventName] || !this.listeners[eventName].includes(element)) return
    const event = new this.CustomEvent(eventName, { detail: args })
    return element.dispatchEvent(event)
  }
}

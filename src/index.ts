interface Events {
  [event: string]: Function[]
}

export default class {
  private events: Events

  constructor () {
    this.events = {}
  }

  public on (event: string, listener: Function): () => void {
    if (!Array.isArray(this.events[event])) {
      this.events[event] = []
    }
    this.events[event].push(listener)
    return () => this.off(event, listener)
  }

  public one (event: string, listener: Function): () => void {
    const remove: (() => void) = this.on(event, (...args: any[]) => {
      remove()
      listener.apply(this, args)
    })
    return remove
  }

  public off (event: string, listener: Function): void {
    if (!Array.isArray(this.events[event])) {
      return
    }
    const idx: number = this.events[event].indexOf(listener)
    if (idx > -1) {
      this.events[event].splice(idx, 1)
    }
  }

  public emit (event: string, ...args: any[]): void {
    if (!Array.isArray(this.events[event]) || !this.events[event].length) {
      return
    }
    [...this.events[event]].map(listener => listener.apply(this, args))
  }
}

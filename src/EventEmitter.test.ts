import EventEmitter from './EventEmitter'

describe('Event Handler', () => {
  const emitter = new EventEmitter()

  it('should trigger event with arguments n times', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.on(element, 'eventName1', listener)
    emitter.emit(element, 'eventName1', 'this is called')
    emitter.emit(element, 'eventName1', 'this is called too')
    emitter.emit(element, 'eventName1', 'this is called as well')
    expect(listener).toHaveBeenCalledTimes(3)
    expect(listener).toHaveBeenCalledWith('this is called')
    expect(listener).toHaveBeenCalledWith('this is called too')
    expect(listener).toHaveBeenCalledWith('this is called as well')
  })

  it('should fire event once', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.one(element, 'eventName2', listener)
    emitter.emit(element, 'eventName2', 'it works')
    emitter.emit(element, 'eventName2', 'not called')
    emitter.emit(element, 'eventName2', 'not called either')
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('it works')
  })

  it('should remove listener', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.on(element, 'eventName3', listener)
    emitter.emit(element, 'eventName3', 'it works as well')
    emitter.off(element, 'eventName3', listener)
    emitter.emit(element, 'eventName3', 'it doesnt call')
    emitter.emit(element, 'eventName3', 'it doesnt call either')
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

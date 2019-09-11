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

  it('should fire again after removing', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.on(element, 'eventName4', listener)
    emitter.emit(element, 'eventName4', 'it works')
    emitter.off(element, 'eventName4', listener)
    emitter.one(element, 'eventName5', listener)
    emitter.emit(element, 'eventName5', 'it works too')
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('should treat different elements events separately', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const element1 = document.createElement('div')
    const element2 = document.createElement('div')
    emitter.on(element1, 'eventName', listener1)
    emitter.on(element2, 'eventName', listener2)
    emitter.emit(element1, 'eventName', 'test1')
    emitter.emit(element2, 'eventName', 'test2')
    emitter.off(element1, 'eventName', listener1)
    emitter.emit(element1, 'eventName', 'test3')
    emitter.emit(element2, 'eventName', 'test4')
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener1).toHaveBeenCalledWith('test1')
    expect(listener1).not.toHaveBeenCalledWith('test3')
    expect(listener2).toHaveBeenCalledTimes(2)
    expect(listener2).toHaveBeenCalledWith('test2')
    expect(listener2).toHaveBeenCalledWith('test4')
  })

  it('should add listeners to native events', () => {
    const listener = jest.fn()
    const element = document.createElement('a')
    emitter.on(element, 'click', listener)
    element.click()
    expect(listener).toHaveBeenCalled()
  })
})

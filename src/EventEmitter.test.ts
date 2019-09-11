import EventEmitter from './EventEmitter'

describe('Event Handler', () => {
  const emitter = new EventEmitter()

  it('should trigger event with arguments n times', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.on(element, 'eventName1', listener)
    emitter.dispatch(element, 'eventName1', 'this is called')
    emitter.dispatch(element, 'eventName1', 'this is called too')
    emitter.dispatch(element, 'eventName1', 'this is called as well')
    expect(listener).toHaveBeenCalledTimes(3)
    expect(listener).toHaveBeenCalledWith('this is called')
    expect(listener).toHaveBeenCalledWith('this is called too')
    expect(listener).toHaveBeenCalledWith('this is called as well')
  })

  it('should fire event once', () => {
    const eventName = 'eventName2'
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.one(element, eventName, listener)
    expect(emitter.registry[eventName]).toBe(1)
    emitter.dispatch(element, eventName, 'it works')
    expect(emitter.registry[eventName]).toBe(0)
    emitter.dispatch(element, eventName, 'not called')
    expect(emitter.registry[eventName]).toBe(0)
    emitter.dispatch(element, eventName, 'not called either')
    expect(emitter.registry[eventName]).toBe(0)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('it works')
  })

  it('should fire again after removing', () => {
    const listener = jest.fn()
    const element = document.createElement('div')
    emitter.on(element, 'eventName4', listener)
    emitter.dispatch(element, 'eventName4', 'it works')
    emitter.off(element, 'eventName4', listener)
    emitter.one(element, 'eventName5', listener)
    emitter.dispatch(element, 'eventName5', 'it works too')
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('should add listeners to native events', () => {
    const listener = jest.fn()
    const element = document.createElement('a')
    emitter.on(element, 'click', listener)
    element.click()
    expect(listener).toHaveBeenCalled()
  })

  it('should be able to combine with addEventListener', () => {
    const listener = jest.fn()
    document.addEventListener('eventName6', listener)
    emitter.dispatch(document, 'eventName6')
    expect(listener).toHaveBeenCalled()
  })

  it('should accept once as an option from addEventListener', () => {
    const listener = jest.fn()
    document.addEventListener('eventName7', listener, { once: true })
    emitter.dispatch(document, 'eventName7')
    emitter.dispatch(document, 'eventName7')
    emitter.dispatch(document, 'eventName7')
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

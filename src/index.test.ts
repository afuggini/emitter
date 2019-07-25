import EventEmitter from '.'

describe('Event Emitter', () => {
  let emitter: EventEmitter
  let marker = 0
  let listener = (args) => {
    marker++
    return args
  }
  let mockListener = jest.fn()

  test('should instance', () => {
    emitter = new EventEmitter()
    expect(emitter).not.toBeUndefined()
  })

  test('should listen for multiple emits', () => {
    emitter.on('dothis', listener)
    emitter.emit('dothis')
    expect(marker).toBe(1)
    emitter.emit('dothis')
    expect(marker).toBe(2)
  })

  test('should listen for emits once', () => {
    emitter.one('dothat', listener)
    emitter.emit('dothat')
    expect(marker).toBe(3)
    emitter.emit('dothat')
    expect(marker).toBe(3)
  })

  test('should accept arguments when emitting', () => {
    const mockArguments = [1, 2, 3]
    emitter.on('sending_arguments', mockListener)
    emitter.emit('sending_arguments', ...mockArguments)
    emitter.emit('sending_arguments', true)
    expect(mockListener).toHaveBeenCalledWith(...mockArguments)
    expect(mockListener).toHaveBeenCalledWith(true)
  })

  test('should remove listener', () => {
    emitter.on('domore', listener)
    emitter.off('domore', listener)
    emitter.emit('domore')
    expect(marker).toBe(3)
  })
})

import PubSub from './PubSub'

describe('PubSub', () => {
  let pubsub: PubSub
  let marker = 0
  let listener = (args) => {
    marker++
    return args
  }
  let mockListener = jest.fn()

  it('should instance', () => {
    pubsub = new PubSub()
    expect(pubsub).not.toBeUndefined()
  })

  it('should listen for multiple emits', () => {
    pubsub.on('dothis', listener)
    pubsub.emit('dothis')
    expect(marker).toBe(1)
    pubsub.emit('dothis')
    expect(marker).toBe(2)
  })

  it('should listen for emits once', () => {
    pubsub.one('dothat', listener)
    pubsub.emit('dothat')
    expect(marker).toBe(3)
    pubsub.emit('dothat')
    expect(marker).toBe(3)
  })

  it('should accept arguments when emitting', () => {
    const mockArguments = [1, 2, 3]
    pubsub.on('sending_arguments', mockListener)
    pubsub.emit('sending_arguments', ...mockArguments)
    pubsub.emit('sending_arguments', true)
    expect(mockListener).toHaveBeenCalledWith(...mockArguments)
    expect(mockListener).toHaveBeenCalledWith(true)
  })

  it('should remove listener', () => {
    pubsub.on('domore', listener)
    pubsub.off('domore', listener)
    pubsub.emit('domore')
    expect(marker).toBe(3)
  })
})

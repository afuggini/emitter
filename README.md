# Emitter

Simple Event Emitter module.

## Example

```javascript
var EventEmitter = require('@afuggini/emitter')

var emitter = new EventEmitter()

emitter.on('someEvent', function (arg) {
  console.log(arg)
})

emitter.emit('someEvent', 'It works!!!')

// 'It works!!!'
```

## API

### `on(eventName: string, listener: Function)`

### `one(eventName: string, listener: Function)`

### `off(eventName: string, listener: Function)`

### `emit(eventName: string[, ...arguments: any])`

## Testing

`yarn test` or `yarn test:watch`

## License

[MIT](https://opensource.org/licenses/MIT)

## Author

[@afuggini](https://github.com/afuggini)

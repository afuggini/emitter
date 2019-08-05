"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PubSub_1 = __importDefault(require("./PubSub"));
describe('PubSub', function () {
    var emitter;
    var marker = 0;
    var listener = function (args) {
        marker++;
        return args;
    };
    var mockListener = jest.fn();
    it('should instance', function () {
        emitter = new PubSub_1.default();
        expect(emitter).not.toBeUndefined();
    });
    it('should listen for multiple emits', function () {
        emitter.on('dothis', listener);
        emitter.emit('dothis');
        expect(marker).toBe(1);
        emitter.emit('dothis');
        expect(marker).toBe(2);
    });
    it('should listen for emits once', function () {
        emitter.one('dothat', listener);
        emitter.emit('dothat');
        expect(marker).toBe(3);
        emitter.emit('dothat');
        expect(marker).toBe(3);
    });
    it('should accept arguments when emitting', function () {
        var _a;
        var mockArguments = [1, 2, 3];
        emitter.on('sending_arguments', mockListener);
        emitter.emit.apply(emitter, ['sending_arguments'].concat(mockArguments));
        emitter.emit('sending_arguments', true);
        (_a = expect(mockListener)).toHaveBeenCalledWith.apply(_a, mockArguments);
        expect(mockListener).toHaveBeenCalledWith(true);
    });
    it('should remove listener', function () {
        emitter.on('domore', listener);
        emitter.off('domore', listener);
        emitter.emit('domore');
        expect(marker).toBe(3);
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter_1 = __importDefault(require("./EventEmitter"));
fdescribe('Event Handler', function () {
    var emitter = new EventEmitter_1.default();
    it('should trigger event with arguments n times', function () {
        var listener = jest.fn();
        var element = document.createElement('div');
        emitter.on(element, 'eventName1', listener);
        emitter.emit(element, 'eventName1', 'this is called');
        emitter.emit(element, 'eventName1', 'this is called too');
        emitter.emit(element, 'eventName1', 'this is called as well');
        expect(listener).toHaveBeenCalledTimes(3);
        expect(listener).toHaveBeenCalledWith('this is called');
        expect(listener).toHaveBeenCalledWith('this is called too');
        expect(listener).toHaveBeenCalledWith('this is called as well');
    });
    it('should fire event once', function () {
        var listener = jest.fn();
        var element = document.createElement('div');
        emitter.one(element, 'eventName2', listener);
        emitter.emit(element, 'eventName2', 'it works');
        emitter.emit(element, 'eventName2', 'not called');
        emitter.emit(element, 'eventName2', 'not called either');
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith('it works');
    });
    it('should remove listener', function () {
        var listener = jest.fn();
        var element = document.createElement('div');
        emitter.on(element, 'eventName3', listener);
        emitter.emit(element, 'eventName3', 'it works as well');
        emitter.off(element, 'eventName3', listener);
        emitter.emit(element, 'eventName3', 'it doesnt call');
        emitter.emit(element, 'eventName3', 'it doesnt call either');
        expect(listener).toHaveBeenCalledTimes(1);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1(EventClass) {
        if (EventClass === void 0) { EventClass = global['CustomEvent']; }
        this.CustomEvent = EventClass;
        this.listeners = {};
    }
    default_1.prototype.on = function (element, eventName, listener, doAfterEmit) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(element);
        return element.addEventListener(eventName, function (event) {
            doAfterEmit && doAfterEmit();
            listener.apply(null, event.detail);
        }, false);
    };
    default_1.prototype.one = function (element, eventName, listener) {
        var _this = this;
        var doAfterEmit = function () { return _this.off(element, eventName, listener); };
        return this.on(element, eventName, listener, doAfterEmit);
    };
    default_1.prototype.off = function (element, eventName, listener) {
        if (!this.listeners[eventName])
            return;
        var index = this.listeners[eventName].indexOf(element);
        if (index === -1)
            return;
        this.listeners[eventName].splice(index, 1);
        return element.removeEventListener(eventName, listener, false);
    };
    default_1.prototype.emit = function (element, eventName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!this.listeners[eventName] || !this.listeners[eventName].includes(element))
            return;
        var event = new this.CustomEvent(eventName, { detail: args });
        return element.dispatchEvent(event);
    };
    return default_1;
}());
exports.default = default_1;

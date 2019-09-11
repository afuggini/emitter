"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1(EventClass) {
        if (EventClass === void 0) { EventClass = global['CustomEvent']; }
        this.CustomEvent = EventClass;
        this.registry = {};
    }
    default_1.prototype.addEventListener = function (element, eventName, listener, options) {
        return element.addEventListener(eventName, function (event) {
            Array.isArray(event.detail) ? listener.apply(null, event.detail) : listener(event);
        }, options || false);
    };
    default_1.prototype.on = function (element, eventName, listener, options) {
        if (this.registry[eventName])
            delete this.registry[eventName];
        return this.addEventListener(element, eventName, listener, options);
    };
    default_1.prototype.one = function (element, eventName, listener, options) {
        this.registry[eventName] = 1;
        return this.addEventListener(element, eventName, listener, options);
    };
    default_1.prototype.off = function (element, eventName, listener, options) {
        return element.removeEventListener(eventName, listener, options || false);
    };
    default_1.prototype.dispatch = function (element, eventName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (this.registry[eventName] === 0)
            return;
        var event = new this.CustomEvent(eventName, { detail: args });
        var dispatched = element.dispatchEvent(event);
        if (this.registry[eventName])
            this.registry[eventName] = 0;
        return dispatched;
    };
    return default_1;
}());
exports.default = default_1;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1() {
        this.events = {};
    }
    default_1.prototype.on = function (event, listener) {
        var _this = this;
        if (!Array.isArray(this.events[event])) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return function () { return _this.off(event, listener); };
    };
    default_1.prototype.one = function (event, listener) {
        var _this = this;
        var remove = this.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            remove();
            listener.apply(_this, args);
        });
        return remove;
    };
    default_1.prototype.off = function (event, listener) {
        if (!Array.isArray(this.events[event])) {
            return;
        }
        var idx = this.events[event].indexOf(listener);
        if (idx > -1) {
            this.events[event].splice(idx, 1);
        }
    };
    default_1.prototype.emit = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(this.events[event]) || !this.events[event].length) {
            return;
        }
        this.events[event].slice().map(function (listener) { return listener.apply(_this, args); });
    };
    return default_1;
}());
exports.default = default_1;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(name) {
        this.listeners = [];
    }
    Event.prototype.subscribe = function (fn) {
        this.listeners.push(fn);
    };
    Event.prototype.trigger = function (args) {
        this.listeners.map(function (fn) { return fn(args); });
    };
    Event.prototype.unsubscribe = function (fn) {
        this.listeners = this.listeners.filter(function (f) { return f != fn; });
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map
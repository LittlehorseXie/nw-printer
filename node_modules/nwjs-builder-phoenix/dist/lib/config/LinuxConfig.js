"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinuxConfig = /** @class */ (function () {
    function LinuxConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        Object.keys(this).map(function (key) {
            if (options[key] !== undefined) {
                switch (key) {
                    default:
                        _this[key] = options[key];
                        break;
                }
            }
        });
    }
    return LinuxConfig;
}());
exports.LinuxConfig = LinuxConfig;
//# sourceMappingURL=LinuxConfig.js.map
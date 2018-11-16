"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinConfig = /** @class */ (function () {
    function WinConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.productName = '';
        this.companyName = '';
        this.fileDescription = '';
        this.productVersion = '';
        this.fileVersion = '';
        this.copyright = '';
        this.versionStrings = {};
        this.icon = undefined;
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
    return WinConfig;
}());
exports.WinConfig = WinConfig;
//# sourceMappingURL=WinConfig.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NsisConfig = /** @class */ (function () {
    function NsisConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.icon = undefined;
        this.unIcon = undefined;
        this.languages = ['English'];
        this.installDirectory = '$LOCALAPPDATA\\${_APPNAME}';
        this.diffUpdaters = false;
        this.hashCalculation = true;
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
    return NsisConfig;
}());
exports.NsisConfig = NsisConfig;
//# sourceMappingURL=NsisConfig.js.map
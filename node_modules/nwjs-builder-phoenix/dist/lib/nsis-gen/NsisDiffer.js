"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var dircompare = require('dir-compare');
var NsisComposer_1 = require("./NsisComposer");
var NsisDiffer = /** @class */ (function (_super) {
    __extends(NsisDiffer, _super);
    function NsisDiffer(fromDir, toDir, options) {
        var _this = _super.call(this, options) || this;
        _this.fromDir = fromDir;
        _this.toDir = toDir;
        return _this;
    }
    // Overrided, https://github.com/Microsoft/TypeScript/issues/2000.
    NsisDiffer.prototype.makeInstallerFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, lines, _i, _a, diff, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, dircompare.compare(this.fromDir, this.toDir, {
                            compareContent: true,
                        })];
                    case 1:
                        result = _k.sent();
                        lines = [];
                        _i = 0, _a = result.diffSet;
                        _k.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 11];
                        diff = _a[_i];
                        if (!(diff.type1 == 'missing' && diff.type2 == 'file')) return [3 /*break*/, 4];
                        _c = (_b = lines).push;
                        return [4 /*yield*/, this.makeWriteFile(diff.path2, '.' + diff.relativePath, diff.name2)];
                    case 3:
                        _c.apply(_b, [_k.sent()]);
                        return [3 /*break*/, 10];
                    case 4:
                        if (!(diff.type1 == 'file' && diff.type2 == 'missing')) return [3 /*break*/, 6];
                        _e = (_d = lines).push;
                        return [4 /*yield*/, this.makeRemoveFile(diff.path1, '.' + diff.relativePath, diff.name1)];
                    case 5:
                        _e.apply(_d, [_k.sent()]);
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(diff.type1 == 'directory' && diff.type2 == 'missing')) return [3 /*break*/, 8];
                        _g = (_f = lines).push;
                        return [4 /*yield*/, this.makeRemoveDir(diff.path1, '.' + diff.relativePath, diff.name1)];
                    case 7:
                        _g.apply(_f, [_k.sent()]);
                        return [3 /*break*/, 10];
                    case 8:
                        if (!(diff.type1 == 'file' && diff.type2 == 'file' && diff.state == 'distinct')) return [3 /*break*/, 10];
                        _j = (_h = lines).push;
                        return [4 /*yield*/, this.makeWriteFile(diff.path2, '.' + diff.relativePath, diff.name2)];
                    case 9:
                        _j.apply(_h, [_k.sent()]);
                        _k.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 2];
                    case 11: return [2 /*return*/, lines.join('\n')];
                }
            });
        });
    };
    NsisDiffer.prototype.makeRemoveFile = function (rootDir, relativeDir, filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "Delete \"$INSTDIR\\" + path_1.win32.normalize(path_1.join(relativeDir, filename)) + "\""];
            });
        });
    };
    NsisDiffer.prototype.makeWriteFile = function (rootDir, relativeDir, filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "SetOutPath \"$INSTDIR\\" + path_1.win32.normalize(relativeDir) + "\"\nFile \"" + path_1.win32.normalize(path_1.resolve(rootDir, filename)) + "\""];
            });
        });
    };
    NsisDiffer.prototype.makeRemoveDir = function (rootDir, relativeDir, filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "RMDir /r \"$INSTDIR\\" + path_1.win32.normalize(path_1.join(relativeDir, filename)) + "\""];
            });
        });
    };
    return NsisDiffer;
}(NsisComposer_1.NsisComposer));
exports.NsisDiffer = NsisDiffer;
//# sourceMappingURL=NsisDiffer.js.map
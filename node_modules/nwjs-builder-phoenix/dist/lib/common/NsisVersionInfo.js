"use strict";
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
var crypto_1 = require("crypto");
var fs_extra_1 = require("fs-extra");
var semver = require("semver");
var NsisVersionInfo = /** @class */ (function () {
    function NsisVersionInfo(path) {
        this.path = path;
        this.outputDir = path_1.dirname(path);
    }
    NsisVersionInfo.prototype.addVersion = function (version, changelog, source) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        if (!data.versions.find(function (item) { return item.version == version; })) {
                            data.versions.push({
                                version: version,
                                changelog: changelog,
                                source: path_1.basename(source),
                                installers: [],
                                updaters: [],
                            });
                        }
                        this.updateLatestVersion();
                        return [2 /*return*/];
                }
            });
        });
    };
    NsisVersionInfo.prototype.getVersions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.versions.map(function (item) { return item.version; })];
                }
            });
        });
    };
    NsisVersionInfo.prototype.getVersion = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        item = data.versions.find(function (item) { return item.version == version; });
                        if (!item) {
                            throw new Error('ERROR_VERSION_NOT_FOUND');
                        }
                        return [2 /*return*/, item];
                }
            });
        });
    };
    NsisVersionInfo.prototype.addInstaller = function (version, arch, path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, versionItem, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _d.sent();
                        versionItem = data.versions.find(function (item) { return item.version == version; });
                        if (!versionItem) {
                            throw new Error('ERROR_VERSION_NOT_FOUND');
                        }
                        if (!!versionItem.installers.find(function (item) { return item.arch == arch; })) return [3 /*break*/, 3];
                        _b = (_a = versionItem.installers).push;
                        _c = {
                            arch: arch,
                            path: path_1.relative(this.outputDir, path)
                        };
                        return [4 /*yield*/, this.hashFile('sha256', path)];
                    case 2:
                        _b.apply(_a, [(_c.hash = _d.sent(),
                                _c.created = Date.now(),
                                _c)]);
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NsisVersionInfo.prototype.addUpdater = function (version, fromVersion, arch, path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, versionItem, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _d.sent();
                        versionItem = data.versions.find(function (item) { return item.version == version; });
                        if (!versionItem) {
                            throw new Error('ERROR_VERSION_NOT_FOUND');
                        }
                        if (!!versionItem.updaters.find(function (item) { return item.fromVersion == fromVersion && item.arch == arch; })) return [3 /*break*/, 3];
                        _b = (_a = versionItem.updaters).push;
                        _c = {
                            fromVersion: fromVersion,
                            arch: arch,
                            path: path_1.relative(this.outputDir, path)
                        };
                        return [4 /*yield*/, this.hashFile('sha256', path)];
                    case 2:
                        _b.apply(_a, [(_c.hash = _d.sent(),
                                _c.created = Date.now(),
                                _c)]);
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NsisVersionInfo.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.writeJson(this.path, this.data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NsisVersionInfo.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.data) return [3 /*break*/, 5];
                        _a = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return fs_extra_1.exists(_this.path, resolve); })];
                    case 1:
                        if (!(_c.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_extra_1.readJson(this.path)];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = {
                            latest: undefined,
                            versions: [],
                        };
                        _c.label = 4;
                    case 4:
                        _a.data = _b;
                        _c.label = 5;
                    case 5: return [2 /*return*/, this.data];
                }
            });
        });
    };
    NsisVersionInfo.prototype.updateLatestVersion = function () {
        if (this.data.versions.length == 0) {
            return;
        }
        var versions = this.data.versions.slice();
        versions.sort(function (a, b) { return semver.gt(a.version, b.version) ? -1 : 1; });
        this.data.latest = versions[0].version;
    };
    NsisVersionInfo.prototype.hashFile = function (type, path) {
        return new Promise(function (resolve, reject) {
            var hasher = crypto_1.createHash(type);
            hasher.on('error', reject);
            hasher.on('readable', function () {
                var data = hasher.read();
                if (data) {
                    hasher.end();
                    resolve(data.toString('hex'));
                }
            });
            fs_extra_1.createReadStream(path).pipe(hasher);
        });
    };
    return NsisVersionInfo;
}());
exports.NsisVersionInfo = NsisVersionInfo;
//# sourceMappingURL=NsisVersionInfo.js.map
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
var fs_extra_1 = require("fs-extra");
var _7zip_bin_1 = require("7zip-bin");
var debug = require('debug')('build:archive');
var _1 = require("./");
function extract(archive, dest, options) {
    if (dest === void 0) { dest = path_1.dirname(archive); }
    if (options === void 0) { options = {
        overwrite: false,
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, code, signal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    debug('in extract', 'archive', archive);
                    debug('in extract', 'dest', dest);
                    return [4 /*yield*/, _1.spawnAsync(_7zip_bin_1.path7za, ['x', '-y', "-ao" + (options.overwrite ? 'a' : 's'), "-o" + path_1.resolve(dest), path_1.resolve(archive)])];
                case 1:
                    _a = _b.sent(), code = _a.code, signal = _a.signal;
                    if (code != 0) {
                        throw new Error("ERROR_EXTRACTING path = " + archive);
                    }
                    return [2 /*return*/, dest];
            }
        });
    });
}
function extractTarGz(archive, dest, options) {
    if (dest === void 0) { dest = path_1.dirname(archive); }
    if (options === void 0) { options = {
        overwrite: false,
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var tar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tar = path_1.join(dest, path_1.basename(archive.slice(0, -3)));
                    return [4 /*yield*/, extract(archive, dest, {
                            overwrite: true,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, extract(tar, dest)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.remove(tar)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, dest];
            }
        });
    });
}
function extractGeneric(archive, dest, options) {
    if (dest === void 0) { dest = path_1.dirname(archive); }
    if (options === void 0) { options = {
        overwrite: false,
    }; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!archive.endsWith('.zip')) return [3 /*break*/, 2];
                    return [4 /*yield*/, extract(archive, dest, options)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!archive.endsWith('tar.gz')) return [3 /*break*/, 4];
                    return [4 /*yield*/, extractTarGz(archive, dest, options)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error('ERROR_UNKNOWN_EXTENSION');
                case 5: return [2 /*return*/, dest];
            }
        });
    });
}
exports.extractGeneric = extractGeneric;
function compress(dir, files, type, archive) {
    return __awaiter(this, void 0, void 0, function () {
        var listfiles, _a, code, signal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    debug('in compress', 'dir', dir);
                    debug('in compress', 'files', files);
                    debug('in compress', 'type', type);
                    debug('in compress', 'archive', archive);
                    return [4 /*yield*/, _1.tmpFile({
                            discardDescriptor: true,
                        })];
                case 1:
                    listfiles = (_b.sent()).path;
                    debug('in compress', 'listfiles', listfiles);
                    return [4 /*yield*/, fs_extra_1.writeFile(listfiles, files.map(function (file) { return path_1.normalize(file); }).join('\r\n'))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, _1.spawnAsync(_7zip_bin_1.path7za, ['a', "-t" + type, path_1.resolve(archive), "@" + path_1.resolve(listfiles)], {
                            cwd: dir,
                        })];
                case 3:
                    _a = _b.sent(), code = _a.code, signal = _a.signal;
                    return [2 /*return*/, code];
            }
        });
    });
}
exports.compress = compress;
//# sourceMappingURL=archive.js.map
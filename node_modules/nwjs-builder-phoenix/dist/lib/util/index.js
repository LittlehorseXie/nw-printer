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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var child_process_1 = require("child_process");
var tmp = require("tmp");
tmp.setGracefulCleanup();
var fs_extra_1 = require("fs-extra");
var debug = require('debug')('build:util');
var globby = require('globby');
__export(require("./archive"));
function mergeOptions(defaults, options) {
    var opts = {};
    Object.keys(defaults).map(function (key) {
        opts[key] = defaults[key];
    });
    Object.keys(defaults).map(function (key) {
        opts[key] = options[key] === undefined ? opts[key] : options[key];
    });
    return opts;
}
exports.mergeOptions = mergeOptions;
function findExecutable(platform, runtimeDir) {
    return new Promise(function (resolve, reject) {
        var pattern = (function () {
            switch (platform) {
                case 'win32':
                case 'win':
                    return '**/nw.exe';
                case 'darwin':
                case 'osx':
                case 'mac':
                    return '**/nwjs.app/Contents/MacOS/nwjs';
                case 'linux':
                    return '**/nw';
                default:
                    throw new Error('ERROR_UNKNOWN_PLATFORM');
            }
        })();
        // FIXME: globby.d.ts.
        globby([pattern], {
            cwd: runtimeDir,
        })
            .then(function (matches) {
            if (matches.length == 0) {
                var err = new Error('ERROR_EMPTY_MATCHES');
                return reject(err);
            }
            debug('in findExecutable', 'matches', matches);
            resolve(path_1.join(runtimeDir, matches[0]));
        });
    });
}
exports.findExecutable = findExecutable;
function findFFmpeg(platform, dir) {
    return new Promise(function (resolve, reject) {
        var pattern = (function () {
            switch (platform) {
                case 'win32':
                case 'win':
                    return '**/ffmpeg.dll';
                case 'darwin':
                case 'osx':
                case 'mac':
                    return '**/libffmpeg.dylib';
                case 'linux':
                    return '**/libffmpeg.so';
                default:
                    throw new Error('ERROR_UNKNOWN_PLATFORM');
            }
        })();
        // FIXME: globby.d.ts.
        globby([pattern], {
            cwd: dir,
        })
            .then(function (matches) {
            if (matches.length == 0) {
                var err = new Error('ERROR_EMPTY_MATCHES');
                return reject(err);
            }
            debug('in findFFmpeg', 'matches', matches);
            resolve(path_1.join(dir, matches[0]));
        });
    });
}
exports.findFFmpeg = findFFmpeg;
function findRuntimeRoot(platform, runtimeDir) {
    return new Promise(function (resolve, reject) {
        var pattern = (function () {
            switch (platform) {
                case 'win32':
                case 'win':
                    return '**/nw.exe';
                case 'darwin':
                case 'osx':
                case 'mac':
                    return '**/nwjs.app';
                case 'linux':
                    return '**/nw';
                default:
                    throw new Error('ERROR_UNKNOWN_PLATFORM');
            }
        })();
        // FIXME: globby.d.ts.
        globby([pattern], {
            cwd: runtimeDir,
        })
            .then(function (matches) {
            if (matches.length == 0) {
                var err = new Error('ERROR_EMPTY_MATCHES');
                return reject(err);
            }
            debug('in findExecutable', 'matches', matches);
            resolve(path_1.join(runtimeDir, path_1.dirname(matches[0])));
        });
    });
}
exports.findRuntimeRoot = findRuntimeRoot;
function findExcludableDependencies(dir, pkg) {
    return __awaiter(this, void 0, void 0, function () {
        var prod, dev, excludable, _i, dev_1, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execAsync('npm ls --prod --parseable', {
                        cwd: dir,
                    })
                        .then(function (_a) {
                        var stdout = _a.stdout, stderr = _a.stderr;
                        return stdout.split(/\r?\n/)
                            .filter(function (path) { return path; })
                            .map(function (path) {
                            return path_1.relative(dir, path);
                        });
                    })];
                case 1:
                    prod = _a.sent();
                    debug('in findExcludableDependencies', 'prod', prod);
                    return [4 /*yield*/, execAsync('npm ls --dev --parseable', {
                            cwd: dir,
                        })
                            .then(function (_a) {
                            var stdout = _a.stdout, stderr = _a.stderr;
                            return stdout.split(/\r?\n/)
                                .filter(function (path) { return path; })
                                .map(function (path) {
                                return path_1.relative(dir, path);
                            });
                        })];
                case 2:
                    dev = _a.sent();
                    debug('in findExcludableDependencies', 'dev', dev);
                    excludable = [];
                    for (_i = 0, dev_1 = dev; _i < dev_1.length; _i++) {
                        d = dev_1[_i];
                        if (prod.indexOf(d) == -1) {
                            excludable.push(d);
                        }
                    }
                    debug('in findExcludableDependencies', 'excludable', excludable);
                    return [2 /*return*/, excludable];
            }
        });
    });
}
exports.findExcludableDependencies = findExcludableDependencies;
function tmpName(options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        tmp.tmpName(Object.assign({}, {}, options), function (err, path) { return err ? reject(err) : resolve(path); });
    });
}
exports.tmpName = tmpName;
function tmpFile(options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        tmp.file(Object.assign({}, {
        //discardDescriptor: true,
        }, options), function (err, path, fd, cleanup) { return err ? reject(err) : resolve({
            path: path, fd: fd, cleanup: cleanup,
        }); });
    });
}
exports.tmpFile = tmpFile;
function tmpDir(options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        tmp.dir(Object.assign({}, {
            unsafeCleanup: true,
        }, options), function (err, path, cleanup) { return err ? reject(err) : resolve({
            path: path, cleanup: cleanup,
        }); });
    });
}
exports.tmpDir = tmpDir;
function fixWindowsVersion(version, build) {
    if (build === void 0) { build = 0; }
    return /^\d+\.\d+\.\d+$/.test(version)
        ? version + "." + build
        : version;
}
exports.fixWindowsVersion = fixWindowsVersion;
function copyFileAsync(src, dest) {
    return __awaiter(this, void 0, void 0, function () {
        var rsrc, stats, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fs_extra_1.realpath(src)];
                case 1:
                    rsrc = _c.sent();
                    return [4 /*yield*/, fs_extra_1.lstat(rsrc)];
                case 2:
                    stats = _c.sent();
                    if (!stats.isDirectory()) return [3 /*break*/, 3];
                    return [3 /*break*/, 6];
                case 3:
                    _a = fs_extra_1.outputFile;
                    _b = [dest];
                    return [4 /*yield*/, fs_extra_1.readFile(rsrc)];
                case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.copyFileAsync = copyFileAsync;
function spawnAsync(executable, args, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        debug('in spawnAsync', 'executable', executable);
        debug('in spawnAsync', 'args', args);
        debug('in spawnAsync', 'options', options);
        var child = child_process_1.spawn(executable, args, options);
        if (child.stdout) {
            child.stdout.on('data', function (chunk) { return debug('in spawnAsync', 'stdout', chunk.toString()); });
        }
        if (child.stderr) {
            child.stderr.on('data', function (chunk) { return debug('in spawnAsync', 'stderr', chunk.toString()); });
        }
        child.on('close', function (code, signal) {
            if (!options.detached) {
                resolve({
                    code: code, signal: signal,
                });
            }
        });
        if (options.detached) {
            child.unref();
            resolve({
                code: 0,
                signal: '',
            });
        }
    });
}
exports.spawnAsync = spawnAsync;
function execAsync(command, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        debug('in execAsync', 'command', command);
        debug('in execAsync', 'options', options);
        var child = child_process_1.exec(command, options, function (err, stdout, stderr) {
            if (!options.detached) {
                resolve({
                    stdout: stdout, stderr: stderr,
                });
            }
        });
        if (options.detached) {
            child.unref();
            resolve({
                stdout: null,
                stderr: null,
            });
        }
    });
}
exports.execAsync = execAsync;
//# sourceMappingURL=index.js.map
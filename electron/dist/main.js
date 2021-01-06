"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var electron_1 = require("electron");
var Path = __importStar(require("path"));
var loadingPage = Path.join(__dirname, "./../../public/loading.html");
var mainPage = Path.join(__dirname, "./../../public/index.html");
var testPage = Path.join(__dirname, "./../index.html");
var ex = __importStar(require("express"));
var express = ex["default"]();
var win;
var port = 12345;
function createAwaitingWindow() {
    var _awin = new electron_1.BrowserWindow({
        width: 240,
        height: 300,
        resizable: false,
        show: false,
        frame: false,
        center: true,
        maximizable: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: true
        }
    });
    return _awin;
}
function createWindow() {
    var _win = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: Path.join(__dirname, './../../public/png/favicon.png'),
        frame: false,
        show: false,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: Path.join(__dirname, './preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            nativeWindowOpen: true,
            devTools: true,
            contextIsolation: true
        }
    });
    return _win;
}
console.log("its updating");
var production = !process.env.ELECTRON_RELOAD;
if (!production) {
    var path = require('path');
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        awaitWriteFinish: true
    });
}
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.getFileIcon(Path.join(__dirname, './../public/png/favicon.png'));
var main;
var loading;
electron_1.app.on('ready', function () {
    loading = createAwaitingWindow();
    loading.once('show', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            main = createWindow();
            express.get('/', function (_, res) { return res.sendFile(mainPage); });
            //@ts-ignore
            express.use(ex.static(Path.join(__dirname, './../../public/')));
            express.listen(port, function () { return console.log('Running on ' + port); });
            express.get('/renderer.js', function (_, res) {
                res.sendFile(Path.join(__dirname, "./renderer.js"));
            });
            main.webContents.once('dom-ready', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('main loaded');
                            loading.hide();
                            loading.blur();
                            loading.close();
                            return [4 /*yield*/, main.show()];
                        case 1:
                            _a.sent();
                            render();
                            return [2 /*return*/];
                    }
                });
            }); });
            // long loading html
            main.loadURL("http://localhost:" + port, { userAgent: 'Chrome' }); //.loadURL(`https://localhost:${port}`)ma
            return [2 /*return*/];
        });
    }); });
    loading.loadFile(loadingPage);
    loading.show();
});
electron_1.app.on('login', function (event, webContents, details, authInfo, callback) {
    event.preventDefault();
    callback('username', 'secret');
});
function render() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
var opn = require('opn');
function open(url) {
    opn(url);
}
//# sourceMappingURL=main.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
let loadingPage = path_1.join(__dirname, "./../../public/loading.html");
let mainPage = path_1.join(__dirname, "./../../public/index.html");
let testPage = path_1.join(__dirname, "./../index.html");
const express = require("express");
const exapp = express();
let win;
const port = 12345;
function createAwaitingWindow() {
    const _awin = new electron_1.BrowserWindow({
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
    const _win = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path_1.join(__dirname, './../../public/png/favicon.png'),
        frame: false,
        show: false,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path_1.join(__dirname, './preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            nativeWindowOpen: true,
            devTools: true,
            contextIsolation: true,
        }
    });
    return _win;
}
console.log("its updating");
const production = !process.env.ELECTRON_RELOAD;
if (!production) {
    require('electron-reload')(__dirname, {
        electron: path_1.join(__dirname, 'node_modules', '.bin', 'electron'),
        awaitWriteFinish: true,
    });
}
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.getFileIcon(path_1.join(__dirname, './../public/png/favicon.png'));
let main;
let loading;
electron_1.app.on('ready', () => {
    loading = createAwaitingWindow();
    loading.once('show', () => __awaiter(void 0, void 0, void 0, function* () {
        main = createWindow();
        exapp.get('/', (_, res) => res.sendFile(mainPage));
        exapp.use(ex.static(path_1.join(__dirname, './../../public/')));
        exapp.listen(port, () => console.log('Running on ' + port));
        exapp.get('/renderer.js', (_, res) => {
            res.sendFile(path_1.join(__dirname, `./renderer.js`));
        });
        main.webContents.once('dom-ready', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('main loaded');
            loading.hide();
            loading.blur();
            loading.close();
            yield main.show();
            render();
        }));
        main.loadURL(`http://localhost:${port}`, { userAgent: 'Chrome' });
    }));
    loading.loadFile(loadingPage);
    loading.show();
});
electron_1.app.on('login', (event, _webContents, _details, _authInfo, callback) => {
    event.preventDefault();
    callback('username', 'secret');
});
function render() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
var opn = require('opn');
function open(url) {
    opn(url);
}
//# sourceMappingURL=main.js.map
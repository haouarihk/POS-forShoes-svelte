import { app, BrowserWindow } from 'electron'

import { join } from "path"



let loadingPage = join(__dirname, "./../../public/loading.html")
let mainPage = join(__dirname, "./../../public/index.html")
let testPage = join(__dirname, "./../index.html")

import express = require('express')
const exapp = express()

let win;


const port = 12345

function createAwaitingWindow(): BrowserWindow {
  const _awin = new BrowserWindow({
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
  })

  return _awin
}


function createWindow(): BrowserWindow {
  const _win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: join(__dirname, './../../public/png/favicon.png'),
    frame: false,
    show: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      devTools: true,
      contextIsolation: true,
    }
  })

  return _win
}


console.log("its updating")

const production = !process.env.ELECTRON_RELOAD;

if (!production) {
  require('electron-reload')(__dirname, {
    electron: join(__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
  });
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



app.getFileIcon(join(__dirname, './../public/png/favicon.png'))


let main: BrowserWindow;
let loading: BrowserWindow;

app.on('ready', () => {

  loading = createAwaitingWindow()

  loading.once('show', async () => {
    main = createWindow()


    exapp.get('/', (_, res) => res.sendFile(mainPage))
    //@ts-ignore
    exapp.use(ex.static(join(__dirname, './../../public/')))
    exapp.listen(port, () => console.log('Running on ' + port))

    exapp.get('/renderer.js', (_, res) => {
      res.sendFile(join(__dirname, `./renderer.js`))
    })



    main.webContents.once('dom-ready', async () => {
      console.log('main loaded')
      loading.hide()
      loading.blur()
      loading.close()
      await main.show()
      render()
    })
    main.loadURL(`http://localhost:${port}`, { userAgent: 'Chrome' })

  })

  loading.loadFile(loadingPage)
  loading.show()
})



app.on('login', (event, _webContents, _details, _authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})

async function render() {


}

var opn = require('opn');
function open(url: string) {
  opn(url);
}
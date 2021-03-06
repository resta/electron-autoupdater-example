'use strict'

const path = require('path')

const { app, BrowserWindow } = require('electron')
const { is } = require('electron-util')
const debug = require('electron-debug')
const { autoUpdater } = require('electron-updater')

require('./ipc')

debug({ showDevTools: true, devToolsMode: 'undocked' })

app.setAppUserModelId('com.examples.electronautoupdaterexample')

autoUpdater.autoDownload = false

let mainwindow

const createmainwindow = async () => {
  const win = new BrowserWindow({
    title: app.name,
    show: false,
    width: 700,
    height: 600,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: is.development,
      contextIsolation: true
    }
  })

  const sendstatustowindow = (status, data) => win.webContents.send('status', { status, data })

  win.on('ready-to-show', () => win.show())

  win.on('closed', () => mainwindow = undefined)

  if (is.development) {
    win.webContents.on('did-finish-load', () => win.webContents.setVisualZoomLevelLimits(1, 3))

    await win.loadURL('http://localhost:4000')

    const installextension = require('electron-devtools-installer')
    await installextension.default(installextension.VUEJS_DEVTOOLS)
  } else {
    await win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }

  // auto-updater

  autoUpdater.on('checking-for-update', () => sendstatustowindow('checking-for-update'))
  autoUpdater.on('update-available', info => sendstatustowindow('update-available', info))
  autoUpdater.on('update-not-available', info => sendstatustowindow('update-not-available', info))
  autoUpdater.on('error', err => sendstatustowindow('error', err))
  autoUpdater.on('download-progress', progress => sendstatustowindow('download-progress', progress))
  autoUpdater.on('update-downloaded', info => sendstatustowindow('update-downloaded', info))

  return win
}

if (!app.requestSingleInstanceLock()) app.quit()

app.on('second-instance', () => {
  if (mainwindow) {
    if (mainwindow.isMinimized()) mainwindow.restore()

    mainwindow.show()
  }
})

app.on('window-all-closed', () => {
  if (!is.macos) app.quit()
})

app.on('activate', async () => {
  if (!mainwindow) mainwindow = await createmainwindow()
})

app.on('ready', async () => {
  mainwindow = await createmainwindow()
})

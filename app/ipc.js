const { ipcMain: ipc } = require('electron')
const { autoUpdater } = require('electron-updater')

const pckg = require('./package.json')

ipc.handle('getappinfo', () => ({ name: pckg.name, version: pckg.version }))

// auto updater

ipc.handle('checkforupdates', () => autoUpdater.checkForUpdates())
ipc.handle('downloadupdate', () => autoUpdater.downloadUpdate())
ipc.handle('quitandinstallupdate', () => autoUpdater.quitAndInstall())

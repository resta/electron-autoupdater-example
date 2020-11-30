const { ipcMain: ipc, app } = require('electron')
const pckg = require('./package.json')

ipc.handle('getappinfo', () => ({ name: pckg.name, version: pckg.version }))

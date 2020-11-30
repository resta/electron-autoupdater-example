const { contextBridge, ipcRenderer: ipc } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    getappinfo: () => ipc.invoke('getappinfo')
  }
)

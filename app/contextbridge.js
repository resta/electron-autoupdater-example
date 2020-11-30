const { contextBridge, ipcRenderer: ipc } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    getappinfo: () => ipc.invoke('getappinfo'),
    onmessage: cb => ipc.on('status', (e, obj) => cb(obj)),
    checkforupdates: () => ipc.invoke('checkforupdates'),
    downloadupdate: () => ipc.invoke('downloadupdate')
  }
)

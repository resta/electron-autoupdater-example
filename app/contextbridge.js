const { contextBridge, ipcRenderer: ipc } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    getappinfo: () => ipc.invoke('getappinfo'),
    onmessage: cb => ipc.on('message', (e, text) => {
      cb(text)
    })
  }
)

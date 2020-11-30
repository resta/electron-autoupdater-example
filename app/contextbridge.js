const { contextBridge, ipcRenderer: ipc } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    getappinfo: () => ipc.invoke('getappinfo'),
    onmessage: () => new Promise((resolve, reject) => {
      ipc.on('message', (e, text) => {
        resolve(text)
      })
    })
  }
)

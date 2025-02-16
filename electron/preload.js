const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  cliente: {
    getAll: () => ipcRenderer.invoke('cliente:getAll'),
    create: (cliente) => ipcRenderer.invoke('cliente:create', cliente),
  },
  veiculo: {
    getAll: () => ipcRenderer.invoke('veiculo:getAll'),
    create: (veiculo) => ipcRenderer.invoke('veiculo:create', veiculo),
  },
});
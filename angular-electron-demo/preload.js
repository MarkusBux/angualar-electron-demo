const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    checkFileExist: (file) => ipcRenderer.invoke('file:checkExist', file),
    startExecutableFile: (path) => ipcRenderer.invoke('path:startExe', path)
});

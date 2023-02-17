interface Window {
  electronAPI: {
    /** Electron ipcRenderer wrapper of send method */
    setTitle: (title: string) => void;
    checkFileExist: (file: string) => Promise<boolean>;
    startExecutableFile: (path: string) => Promise<boolean>;
  };
}

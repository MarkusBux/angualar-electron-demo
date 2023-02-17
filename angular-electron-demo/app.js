const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const child = require('child_process').execFile;

app.whenReady().then(() => {
    ipcMain.handle('file:checkExist', handleCheckFileExist);
    ipcMain.handle('path:startExe', handleFileOpen);
    createWindow();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

function handleCheckFileExist(event, file) {
    // fs-exrta logic for file check
    console.log(file);

    if (fs.pathExistsSync(file)) {
        console.log(true);
        return true;
    }
    else {
        console.log(false);
        return false;
    }

}

function handleFileOpen(event, path) {
    console.log('path', path);

    let executablePath = path;

    child(executablePath, null, function (err, data) {
        console.log(data.toString());
        event.returnValue = data;
    });
}

function createWindow() {
    maintWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    maintWindow.webContents.openDevTools();
    maintWindow.loadFile('dist/angular-electron-demo/index.html');
}

const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

// Reload app when code changes
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
});

app.whenReady().then(createWindow);
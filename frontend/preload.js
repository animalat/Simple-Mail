const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationAPI: {
        sendNotification(message) {
            ipcRenderer.send('notify', message);
        }
    }
});
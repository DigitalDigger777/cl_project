const { app, ipcMain, BrowserWindow, autoUpdater, dialog } = require('electron');

//setup logger
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

const version = app.getVersion();
console.log('ver:', version);

const feed = 'https://github.com/kormanyuri/cl_updater/releases/download/v1.0.0';
autoUpdater.setFeedURL(feed);

setInterval(() => {
    console.log('check update');
    const u = autoUpdater.checkForUpdates();
    console.log('u:', u);
    console.log('platform:', process.platform);

}, 60000);

autoUpdater.on('checking-for-update', () => {
    console.log('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
    console.log('Update available');
    console.log('Version', info.version);
    console.log('Release Date', info.releaseDate);
});

autoUpdater.on('update-not-available', () => {
    console.log('Update not available');
});

autoUpdater.on('download-progress', (progress) => {
    console.log(`Progress ${Math.floor(progress.percent)}`);
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    console.log('Update downloaded');

    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
    })
});

autoUpdater.on('error', message => {
    console.error('There was a problem updating the application');
    console.error(message)
})

// const { app, autoUpdater, dialog } = require('electron');
// https://github.com/hlor/client/releases/download/1.0/Hlor-Client-Linux.tar.gz
// const path = require('path');
// const url = require('url');


//express
// подключение express
const express = require("./express");

// ===================

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {

    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) {
                win.restore();
            }
            win.focus()
        }
    });



    function createWindow () {
        express();
        // Create the browser window.
        win = new BrowserWindow({
            icon:'favicon-96x96.png',
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true
            }
        });


        // and load the index.html of the app.
        // const startUrl = process.env.ELECTRON_START_URL || url.format({
        //     pathname: path.join(__dirname, '/../build/index.html'),
        //     protocol: 'file',
        //     slashes: true
        // });
        // win.loadFile('index.html');
        // win.loadURL('../build/index.html');
        // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)

        // for test
        win.loadURL('http://localhost:3002');

        // for prod
        // win.loadURL('http://localhost:2808');

        // Open the DevTools.
        // win.webContents.openDevTools()

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null
        })
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow()
        }
    });

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

}


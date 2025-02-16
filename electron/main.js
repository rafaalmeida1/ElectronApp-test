const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { setupDb } = require('../src/utils/db');
const clienteController = require('../src/controllers/clienteController');
const veiculoController = require('../src/controllers/veiculoController');

let mainWindow;

async function createWindow() {
  await setupDb();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('Failed to load URL, retrying...');
    setTimeout(() => mainWindow.loadURL(startUrl), 1000);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Register IPC handlers
  clienteController(ipcMain);
  veiculoController(ipcMain);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// Disable hardware acceleration if needed
app.disableHardwareAcceleration();
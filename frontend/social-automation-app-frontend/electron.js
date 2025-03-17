const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  // Create the main application window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional, for additional scripts
      nodeIntegration: false, // Disable Node.js in the renderer process for security
      contextIsolation: true, // Isolate the context for security
    },
  });

  // Load your React app
  mainWindow.loadURL('http://localhost:3000'); // During development
  // Uncomment the following line in production to load the React build
  // mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

  // Optional: Open developer tools (useful during development)
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  // Quit the app when all windows are closed, except on macOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Re-create a window when the app is clicked in the dock (macOS behavior)
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    mainWindow.loadURL('http://localhost:3000');
  }
});


const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 450,
    height: 600,
    resizable: false,
    fullscreenable: false,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: require('path').join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
});

ipcMain.on('app:quit', () => {
  app.quit()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
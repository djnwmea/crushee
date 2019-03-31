const { app, BrowserWindow, ipcMain, systemPreferences } = require('electron')
const path = require("path")
const { fork, spawn } = require("child_process")
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    icon: __dirname + '/assets/icon.ico', 
    title: 'Crushee',
    webPreferences: {
      navigateOnDragDrop: false,
      webSecurity: false,
      experimentalFeatures: true,
      preload: path.resolve(__dirname, 'preload.js')
    },
    titleBarStyle: "default"
  })


  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:1603/')
  mainWindow.setMenuBarVisibility(false)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


let crusheeDir = path.resolve(__dirname, 'crushee-server')
const server = spawn(path.resolve(crusheeDir + "\\node.exe"), ["index.js"], {cwd: crusheeDir, stdio: ['inherit', 'inherit', 'inherit', 'ipc'], silent: false})
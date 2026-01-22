const { BrowserWindow } = require("electron");
const path = require("path");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, "../../public/index.html"));
}

module.exports = { createMainWindow };

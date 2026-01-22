const { app } = require("electron");
const { createMainWindow } = require("./window");

app.whenReady().then(() => {
  createMainWindow();
});


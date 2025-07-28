const { app, BrowserWindow } = require("electron/main")
const path = require("path")

const createWindow = () => {
	const win = new BrowserWindow({
		width: 512,
		height: 512,
		autoHideMenuBar: true,
		resizable: false,
	})
	win.setIcon(path.join(__dirname, "icon.png"))

	win.loadFile("index.html")
}

app.whenReady().then(() => {
	createWindow()

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})
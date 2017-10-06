const { app, BrowserWindow, Menu, MenuItem, } = require('electron')
const path = require('path')
const url = require('url')

let win

app.on('ready', createWindow)

function createWindow (){
	win = new BrowserWindow({
		width:1080, 
		height:720,
		resizable: false
	
	})
	win.setMenu(null);
	
 win.loadURL(url.format({
   pathname: path.join(__dirname, '../www/index.html'),
   protocol: 'file:',
   slashes: true
 }))
	
	win.on('closed', () => {
		win= null
	})
}

app.on('window-all-closed',() => {
	if (process.platform !== 'BapusdaV2') {
		app.quit()
	}
})
app.on('activate',() => {
		if (Win === null){
			createWindow()
		}
	}
)

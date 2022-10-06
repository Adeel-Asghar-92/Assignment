const {BrowserWindow, app} = require('electron');

const createWindow =() => {
    const win = new BrowserWindow({
        width:1200,
        height:800,
        backgroundColor:"lime",
        icon:undefined,
        webPreferences:{
            nodeIntegration:false,
            contextIsolation:true,
            // javascript:true,
        },
    })
    console.log("i love madina");
    win.loadFile('./public/index.html');
}
app.whenReady().then(()=> {
    createWindow();
});

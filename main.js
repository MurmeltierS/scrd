const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
//const http = require('http');
var mobileapp = require('express')();
var http = require('http').Server(mobileapp);
var io = require('socket.io')(http);
var ip = require('ip');





var contents;
mobileapp.get('/', function(req, res){
  res.sendFile(__dirname + '/mobile/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  contents.executeJavaScript('connected()');
  socket.on('startApp', function(msg){
    console.log('startApp: ' + msg);
    contents.executeJavaScript('startApp("'+msg+'")');
    io.emit('startApp', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on '+ip.address()+':3000');
  
});

function makeQR(){
  contents.executeJavaScript('makeQR("http://'+ip.address()+':3000'+'")');
}

global.something = "heyho:)";



global.io = io;



  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600, backgroundColor: '#000', kiosk: true});
    win.setMenu(null);
    win.webContents.openDevTools();
    // und Laden der index.html der App.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
    contents = win.webContents;
    makeQR();
  }

  app.on('ready', createWindow)

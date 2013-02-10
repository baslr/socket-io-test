// Generated by CoffeeScript 1.4.0
(function() {
  var fs, https, ioServer, ioWebServer, nodeStatic, options, staticS, webServer;

  https = require('https');

  fs = require('fs');

  nodeStatic = require('node-static');

  staticS = new nodeStatic.Server(".");

  options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  webServer = https.createServer(options);

  ioWebServer = https.createServer(options);

  ioWebServer.listen(8088, '127.0.0.1');

  ioServer = require('socket.io').listen(ioWebServer);

  webServer.listen(8080, '127.0.0.1');

  webServer.on('request', function(req, res) {
    return staticS.serve(req, res);
  });

  ioServer.sockets.on('connection', function(socket) {
    console.log("connect WebSocket Client");
    socket.on('disconnect', function() {
      console.log("================ SOCKS =======================");
      console.log("disconnect WebSocket Client");
      return console.log(socket.id);
    });
    return socket.on('ping', function() {
      return console.log("ping");
    });
  });

}).call(this);
http       = require 'http'
fs         = require 'fs'
nodeStatic = require 'node-static'
staticS    = new nodeStatic.Server "."

# options   = key:fs.readFileSync('key.pem'),cert:fs.readFileSync('cert.pem')
webServer = http.createServer() # (options)

ioWebServer = http.createServer() # (options)
ioWebServer.listen 8088, '127.0.0.1'

ioServer = require('socket.io').listen(ioWebServer)
# ioServer.set('log level', 1)

webServer.listen 8080, '127.0.0.1'

webServer.on 'request', (req, res) ->
  staticS.serve req, res


# socket.io
ioServer.sockets.on 'connection', (socket) ->
  console.log "connect WebSocket Client"

#  socket.emit 'ping'

  socket.on 'disconnect', ->
    console.log "================ SOCKS ======================="
    console.log "disconnect WebSocket Client"
    console.log socket.id
    
  socket.on 'ping', ->
    console.log "ping"


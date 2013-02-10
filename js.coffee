($ document).ready ->

  socket = io.connect 'http://127.0.0.1:8088'

  socket.on 'ping', ->
    socket.emit 'pong'
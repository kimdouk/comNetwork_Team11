const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

io.on("connection", (socket) => {
  console.log('connection')
  socket.on("init", (payload) => {
    console.log(payload)
  })
})

httpServer.listen(80)
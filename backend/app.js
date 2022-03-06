const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

io.on("connection", (socket) => {
  socket.on("init", (payload) => {
    console.log(payload)
  })
  socket.on("send message", (item) => {
    console.log(item.nickname + " : " + item.message);
    io.emit("receive message", { nickname: item.nickname, message: item.message });
  });
})

server.listen(727, () => {
  console.log('Listening on port 727')
})
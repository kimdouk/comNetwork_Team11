const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

let isEmpty = true;

const participants = {
  owner: {},
  counter: {}
};

function judge (num1, num2) {
  num1 = num1.split('')
  num2 = num2.split('')

  let strike = 0
  let ball = 0
  let result = ''
  
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      if (num1[i] === num2[j]) {
        if (i === j) {
          strike += 1
        } else {
          ball += 1
        }
      }
    }
  }

  if (strike || ball) {
    if (strike) {
      result += `${strike}S`
    }
    if (ball) {
      result += `${ball}B`
    }
  }
  else {
    result = 'Out'
  }
  return result
}

io.on("connection", (socket) => {
  socket.on("init", (payload) => {
    const role = isEmpty ? 'owner' : 'counter';

    participants[role] = payload
    participants[role]['role'] = role
    participants[role]['socket_id'] = socket.id
    io.to(socket.id).emit('set role', role)

    io.emit('set turn', 'owner')

    isEmpty = false
    console.log(participants)
  })
  socket.on("send message", (item) => {
    io.emit("receive message", {...item});

    const counter = (item.role === 'owner') ? participants.counter : participants.owner
    const message = judge(counter.number, item.message)

    io.emit("receive message", {
      nickname: counter.nickname,
      role: counter.role,
      message
    });

    io.emit('set turn', counter.role)
  });
})

server.listen(727, () => {
  console.log('Listening on port 727')
})
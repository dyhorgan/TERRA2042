const IO = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('send msg', data => {
      io.emit('send msg', data)
    })

    socket.on('play card', data => {
      io.emit('play card', data)
    })

    socket.on('attack', data => {
      io.emit('attack', data)
    })

    socket.on('draw card', () => {
      io.emit('draw card')
    })
  })
}

const GAMENSP = gameNsp => {
  gameNsp.on('connection', socket => {
    console.log(`A socket connection to games has been made: ${socket.id}`)

    gameNsp.emit('welcome')

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the lobby`)
    })

    socket.on('join', data => {
      socket.join(`room${data.id}`)
      gameNsp.to(`room${data.id}`).emit('joined room', data)
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}

const IO = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

const GAMENSP = gameNsp => {
  let id
  gameNsp.on('connection', socket => {
    console.log(`A socket connection to games has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the lobby`)
    })
    socket.on('join', data => {
      socket.join(`room${data.roomId}`)
      id = data.roomId
      if (gameNsp.adapter.rooms[`room${data.roomId}`].length === 1) {
        gameNsp.adapter.rooms[`room${data.roomId}`].host = socket.id
      }

      gameNsp.to(socket.id).emit('join', {
        numPpl: gameNsp.adapter.rooms[`room${data.roomId}`].length
      })
    })

    socket.on('id exchange', data => {
      socket.to(`room${data.roomId}`).emit('id exchange', {
        ...data,
        host: gameNsp.adapter.rooms[`room${data.roomId}`].host
      })
    })

    socket.on('game started', data => {
      socket.to(`room${data.roomId}`).emit('game started', data)
    })
    socket.on('move made', data => {
      socket.to(`room${id}`).emit('move made')
    })
    socket.on('play card', data => {
      console.log('emitting from gameNSP')
      socket.to(`room${id}`).emit('play card', data)
    })

    socket.on('attack', data => {
      console.log('emitting from gameNSP')
      socket.to(`room${id}`).emit('attack', data)
    })

    socket.on('draw card', () => {
      console.log('emitting from gameNSP')
      socket.to(`room${id}`).emit('draw card')
    })

    socket.on('send msg', data => {
      console.log('emitting from gameNSP')
      gameNsp.in(`room${id}`).emit('send msg', data)
    })
    socket.on('end turn', () => {
      console.log('emitting from gameNSP')
      gameNsp.in(`room${id}`).emit('end turn')
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}

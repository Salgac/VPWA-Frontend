import { io, Socket } from 'socket.io-client'

export default class SocketIO {
  socket: Socket

  constructor(token: string) {
    this.socket = io(
      "http://127.0.0.1:3333",
      {
        auth: {
          token: token
        }
      }
    )
    this.socket.on("connect_error", (err) => {
      console.log(err instanceof Error)
      console.log(err.message)
    })
  }
}

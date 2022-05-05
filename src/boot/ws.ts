import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'

interface MessageData {
  token: string,
  userName: string,
  channelName: string,
  time: string
  text: string
}
interface NewMessage {
  author: string,
  time: string,
  text: string
}

const socket = io(`${process.env.API_HOST}`);

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }/* { app, router, ... } */) => {
  // something to do
  socket.on('newMessage', (data) => {
    const messageData = data as MessageData
    const newMessage: NewMessage = {
      author: messageData.userName,
      time: messageData.time,
      text: messageData.text
    }
    if (messageData.channelName == store.state.channelSavedData.currentChannel) {
      store.commit("channelSavedData/addMessage", newMessage)
      console.log('sent to ' + messageData.channelName)
    }
  })
})

export { socket }

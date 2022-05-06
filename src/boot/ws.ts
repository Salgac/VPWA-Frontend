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
  text: string,
  channelName: string
}

interface InviteData {
  token: string,
  fromUser: string,
  toUser: string,
  channel: {
    name: string,
    isPrivate: boolean,
    owner: string
  }
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
      text: messageData.text,
      channelName: messageData.channelName
    }

    store.commit("channelSavedData/addMessage", newMessage)
    console.log('sent to ' + messageData.channelName)
  })
  socket.on('newInvite', (data) => {
    const inviteData = data as InviteData
    if (inviteData.toUser == store.state.userSavedData.username) {
      store.commit("channelSavedData/addChannel", {
        channelName: inviteData.channel.name,
        isPrivate: inviteData.channel.isPrivate,
        owner: inviteData.channel.owner,
        messages: []
      })
      store.commit("channelSavedData/setTopChannel", inviteData.channel.name)
    }
  })
  socket.on('inviteError', (data: { message: string, user: string }) => {
    if (data.user == store.state.userSavedData.username) {
      store.commit("commandSavedData/setMessage", data.message)
      store.commit("commandSavedData/setErrorBool", true)
    }
  })
})

export { socket }

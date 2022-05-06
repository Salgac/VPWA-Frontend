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
    owner: string,
    messages: any[],
  }
}

interface ErrorData {
  message: string,
  user: string
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

    //add to store
    store.commit("channelSavedData/addMessage", newMessage)

    //change scroll if user in channel
    if (messageData.channelName == store.state.channelSavedData.currentChannel.name) {
      store.commit("channelSavedData/setScroll", "notify");
    }

  })
  socket.on('newInvite', (data) => {
    const inviteData = data as InviteData
    if (inviteData.toUser == store.state.userSavedData.username) {
      store.commit("channelSavedData/addChannel", {
        channel: {
          channelName: inviteData.channel.name,
          isPrivate: inviteData.channel.isPrivate,
          owner: inviteData.channel.owner,
          messages: inviteData.channel.messages,
        },
        top: true
      })
      store.commit("channelSavedData/setTopChannel", inviteData.channel.name)
    }
  })
  socket.on('inviteError', (data) => {
    const errorData = data as ErrorData
    console.log(errorData)
    if (errorData.user == store.state.userSavedData.username) {
      store.commit("commandSavedData/setMessage", errorData.message)
      store.commit("commandSavedData/setErrorBool", true)
    }
  })
})

export { socket }

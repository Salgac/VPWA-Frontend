import SocketIO from 'src/services/ws';
import socket from 'src/services/ws';
import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

const mutation: MutationTree<ChannelStateInterface> = {
  openCloseChannelCreation(state, val: boolean) {
    state.openChannelCreation = val;
  },

  //sets current channel
  setCurrentChannel(state, newChannelName: string) {
    state.currentChannel = newChannelName;
  },

  //used for loading channel list
  setChannels(state, channelList) {
    state.channels = channelList;
  },

  addMessage(state, val: { author: string, time: string, text: string, token: string }) {
    const channels = state.channels;
    const currentChannel = state.currentChannel;

    var obj = channels.find((ch) => ch.channelName === currentChannel);
    obj?.messages.push({
      author: val.author,
      time: val.time,
      text: val.text
    });
    new SocketIO(val.token).socket.emit(
      'addMessage',
      {
        userName: val.author,
        channelName: currentChannel,
        text: val.text
      }
    )
  },

  addChannel(state, channel) {
    state.channels.push(channel);
  },

  //removes channel from sidebar
  removeChannel(state, channelName: string) {
    state.channels = state.channels.filter((ch) => ch.channelName !== channelName)
  },
};

export default mutation;

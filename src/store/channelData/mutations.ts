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

  addMessage(state, val: { author: string, time: string, text: string }) {
    const channels = state.channels;
    const currentChannel = state.currentChannel;

    var obj = channels.find((ch) => ch.channelName === currentChannel);
    obj?.messages.push({
      author: val.author,
      time: val.time,
      text: val.text
    });
  },

  addChannel(state, channel) {
    state.channels.push(channel);
  },

  //removes channel from sidebar
  removeChannel(state, channelName: string) {
    state.channels = state.channels.filter((ch) => ch.channelName !== channelName)
  },

  /*deleteChannelUser(state, data: { channelName: string, username: string }) {
    var obj = state.channels.find(
      ch => ch.channelName === data.channelName
    )
    if (obj == undefined) {
      return
    }
    var userIndex = obj.users.findIndex(
      u => u.username === data.username
    )
    if (userIndex > -1) {
      obj.users.splice(userIndex, 1)
    }
  }*/
};

export default mutation;

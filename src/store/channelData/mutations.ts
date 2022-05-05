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

  addMessage(state, val: { author: string, time: string, text: string, channelName: string }) {
    const channels = state.channels;

    var obj = channels.find((ch) => ch.channelName === val.channelName);
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
};

export default mutation;

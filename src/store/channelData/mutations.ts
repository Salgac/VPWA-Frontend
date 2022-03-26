import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

const mutation: MutationTree<ChannelStateInterface> = {
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
    obj?.messages.push(val);
  }
};

export default mutation;

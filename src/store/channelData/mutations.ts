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
  }
};

export default mutation;

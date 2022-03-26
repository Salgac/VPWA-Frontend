import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

const mutation: MutationTree<ChannelStateInterface> = {
  setChannel(state, newChannelName: string) {
    state.currentChannel = newChannelName;
  }
};

export default mutation;

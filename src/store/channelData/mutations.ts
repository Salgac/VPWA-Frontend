import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

interface Channel {
  channelName: string,
  isPrivate: boolean,
  owner: string,
  messages: {
    author: string,
    time: string,
    text: string
  }[],
}

const mutation: MutationTree<ChannelStateInterface> = {
  openCloseChannelCreation(state, val: boolean) {
    state.openChannelCreation = val;
  },

  //sets current channel
  setCurrentChannel(state, newChannel) {
    state.currentChannel = newChannel;
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

  addChannel(state, val: { channel: Channel, top: boolean }) {
    if (val.top) {
      state.channels.unshift(val.channel);
    } else {
      state.channels.push(val.channel);
    }
  },

  //removes channel from sidebar
  removeChannel(state, channelName: string) {
    state.channels = state.channels.filter((ch) => ch.channelName !== channelName)
  },

  setTopChannel(state, val: string) {
    state.topChannelName = val
  }
};

export default mutation;

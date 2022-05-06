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
      id: Infinity,
      author: val.author,
      time: val.time,
      text: val.text
    });
  },

  addOldMessages(state, obj) {
    state.channels.find(ch => ch.channelName == obj.channel)!.messages.unshift(...obj.messages);
  },

  addChannel(state, channel) {
    state.channels.push(channel);
  },

  //removes channel from sidebar
  removeChannel(state, channelName: string) {
    state.channels = state.channels.filter((ch) => ch.channelName !== channelName)
  },

  setScroll(state, value: string) {
    state.setScroll = value;
  },

  //reset state values to default
  reset(state) {
    state.currentChannel = "";
    state.setScroll = "";
    state.channels = [];
    state.newMessage = {
      author: "",
      time: "",
      text: "",
      channelName: "",
    };
  }
};

export default mutation;

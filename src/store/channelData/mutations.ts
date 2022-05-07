import { store } from 'quasar/wrappers';
import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

interface Channel {
  channelName: string,
  isPrivate: boolean,
  owner: string,
  messages: {
    id: number,
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
  setCurrentChannel(state, newChannelName) {
    setCurrentChannelHelper(state, newChannelName);
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

    //set current channel at channels[0]
    setCurrentChannelHelper(state, state.channels[0].channelName);
  },


  setScroll(state, value: string) {
    state.setScroll = value;
  },

  //reset state values to default
  reset(state) {
    state.currentChannel = {
      name: "",
      isPrivate: false,
      owner: ""
    };
    state.setScroll = "";
    state.channels = [];
    state.newMessage = {
      author: "",
      time: "",
      text: "",
      channelName: "",
    };
  },

  setTopChannel(state, val: string) {
    state.topChannelName = val
  }
};

function setCurrentChannelHelper(state: ChannelStateInterface, channelName: string) {
  const ch = state.channels.find(ch => ch.channelName == channelName)!;
  state.currentChannel = {
    name: ch.channelName,
    isPrivate: ch.isPrivate,
    owner: ch.owner,
  };
}

export default mutation;

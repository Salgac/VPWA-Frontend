export interface ChannelStateInterface {
  openChannelCreation: boolean;
  currentChannel: {
    name: string,
    isPrivate: boolean,
    owner: string
  };
  channels: {
    channelName: string,
    isPrivate: boolean,
    owner: string,
    messages: {
      author: string,
      time: string,
      text: string
    }[],
  }[];
  newMessage: {
    author: string,
    time: string,
    text: string,
    channelName: string
  },
  topChannelName: string
}

function state(): ChannelStateInterface {
  return {
    openChannelCreation: false,
    currentChannel: {
      name: "",
      isPrivate: false,
      owner: ""
    },
    channels: [],
    newMessage: {
      author: "",
      time: "",
      text: "",
      channelName: ""
    },
    topChannelName: ""
  };
}

export default state;

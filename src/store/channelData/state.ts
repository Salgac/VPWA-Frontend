export interface ChannelStateInterface {
  openChannelCreation: boolean;

  setScroll: string;

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
      id: number,
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
    setScroll: "",
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

export interface ChannelStateInterface {
  openChannelCreation: boolean;
  currentChannel: string;
  setScroll: boolean;
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
  }
}

function state(): ChannelStateInterface {
  return {
    openChannelCreation: false,
    currentChannel: "",
    setScroll: false,
    channels: [],
    newMessage: {
      author: "",
      time: "",
      text: "",
      channelName: ""
    }
  };
}

export default state;

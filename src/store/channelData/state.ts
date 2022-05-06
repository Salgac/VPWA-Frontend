export interface ChannelStateInterface {
  openChannelCreation: boolean;
  currentChannel: string;
  setScroll: string;
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
  }
}

function state(): ChannelStateInterface {
  return {
    openChannelCreation: false,
    currentChannel: "",
    setScroll: "",
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

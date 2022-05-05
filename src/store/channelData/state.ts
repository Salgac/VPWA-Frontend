export interface ChannelStateInterface {
  openChannelCreation: boolean;
  currentChannel: string;
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

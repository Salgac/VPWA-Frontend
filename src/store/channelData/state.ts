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
    users: {
      name: string,
      surname: string,
      email: string,
      username: string
    }[]
  }[];
  newMessage: {
    author: string,
    time: string,
    text: string
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
      text: ""
    }
  };
}

export default state;

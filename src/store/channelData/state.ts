export interface ChannelStateInterface {
  currentChannel: string;
  channels: {
    channelName: string,
    icon: string,
    dropdown: {
      label: string,
      icon: string
    }[],
    messages: {
      author: string, time: string, text: string
    }[],
  }[];
  newMessage: { author: string, time: string, text: string }
}

function state(): ChannelStateInterface {
  return {
    currentChannel: "",
    channels: [],
    newMessage: { author: "", time: "", text: "" }
  };
}

export default state;

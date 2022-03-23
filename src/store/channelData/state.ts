export interface ChannelStateInterface {
  currentChannel: string;
}

function state(): ChannelStateInterface {
  return {
    currentChannel: "",
  };
}

export default state;

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
    }[]
  }[]
}

function state(): ChannelStateInterface {
  return {
    currentChannel: "",
    channels: [
      {
        channelName: "chatting",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
        ],
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
      },
      {
        channelName: "memes",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Permissions", icon: "shield" },
          { label: "Rename", icon: "edit" },
        ],
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
      },
      {
        channelName: "music",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Permissions", icon: "shield" },
          { label: "Delete", icon: "delete" },
          { label: "Rename", icon: "edit" },
        ],
        messages: [],
      },
      {
        channelName: "games",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
        ],
        messages: [],
      },
      {
        channelName: "coding",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Delete", icon: "delete" },
          { label: "Rename", icon: "edit" },
        ],
        messages: [],
      }
    ]
  };
}

export default state;

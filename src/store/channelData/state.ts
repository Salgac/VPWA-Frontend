export interface ChannelStateInterface {
  currentChannel: string;
  channels: {
    channelName: string,
    icon: string,
    dropdown: {
      label: string,
      icon: string
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
      },
      {
        channelName: "games",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
        ],
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
      }
    ]
  };
}

export default state;

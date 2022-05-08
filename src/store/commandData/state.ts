export interface CommandStateInterface {
  currentCommand: string;
  commands: { commandName: string }[];
  commandMessage: string;
  errorBool: boolean;

  notification: {
    author: string,
    time: string,
    text: string,
    channelName: string,
  } | null;
}

function state(): CommandStateInterface {
  return {
    currentCommand: "",
    commands: [
      { commandName: "kick" },
      { commandName: "join" },
      { commandName: "invite" },
      { commandName: "revoke" },
      { commandName: "cancel" },
      { commandName: "quit" },
      { commandName: "list" }
    ],
    commandMessage: "",
    errorBool: false,

    notification: null,
  };
}

export default state;

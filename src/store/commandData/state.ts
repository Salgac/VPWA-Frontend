export interface CommandStateInterface {
  currentCommand: string;
  commands: { commandName: string }[];
  commandMessage: string;
  errorBool: boolean
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
    errorBool: false
  };
}

export default state;

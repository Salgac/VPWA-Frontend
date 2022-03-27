export interface CommandStateInterface {
  currentCommand: string;
  commands: { commandName: string }[]
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
    ]
  };
}

export default state;

export interface CommandStateInterface {
  currentCommand: string;
  commands: { commandName: string, commandRole: string }[]
}

function state(): CommandStateInterface {
  return {
    currentCommand: "",
    commands: [
      { commandName: "kick", commandRole: "admin" },
      { commandName: "createChannel", commandRole: "chatter" },
      { commandName: "invite", commandRole: "chatter" }
    ]
  };
}

export default state;

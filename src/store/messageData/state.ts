export interface MessageStateInterface {
  currentCommand: string;
  commands: { commandName: string, commandRole: string }[]
}

function state(): MessageStateInterface {
  return {
    currentCommand: "",
    commands: [
      { commandName: "ban", commandRole: "admin" },
      { commandName: "createChannel", commandRole: "chatter" },
      { commandName: "invite", commandRole: "chatter" }
    ]
  };
}

export default state;

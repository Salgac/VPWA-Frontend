export interface MessageStateInterface {
  currentCommand: string;
  commands: { commandName: string, commandRole: string }[];
  messages: { author: string, time: string, text: string }[];
  newMessage: { author: string, time: string, text: string }
}

function state(): MessageStateInterface {
  return {
    currentCommand: "",
    commands: [
      { commandName: "ban", commandRole: "admin" },
      { commandName: "createChannel", commandRole: "admin" },
      { commandName: "invite", commandRole: "pleb" }
    ],
    messages: [
      { author: "You", time: "12:43:08", text: "Hello world!" },
      { author: "Testy", time: "12:44:45", text: "I like turtles" },
    ],
    newMessage: { author: "", time: "", text: "" }
  };
}

export default state;

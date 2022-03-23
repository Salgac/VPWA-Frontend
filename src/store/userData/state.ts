export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  email: string;
  role: string;
  messages: { author: string, time: string, text: string }[],
  newMessage: { author: string, time: string, text: string }
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    email: "",
    role: "pleb",
    messages: [
      { author: "You", time: "12:43", text: "Hello world!" },
      { author: "Testy", time: "12:44", text: "I like turtles" },
    ],
    newMessage: { author: "", time: "", text: "" }
  };
}

export default state;

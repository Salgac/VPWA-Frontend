export interface MessageStateInterface {
  currentCommand: string;
}

function state(): MessageStateInterface {
  return {
    currentCommand: "",
  };
}

export default state;

export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  email: string;
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    email: "",
  };
}

export default state;

export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  email: string;
  role: string;
  openSettings: boolean;
  openAccountSettings: boolean
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    email: "",
    role: "pleb",
    openSettings: false,
    openAccountSettings: false
  };
}

export default state;

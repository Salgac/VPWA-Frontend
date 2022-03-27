export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  surname: string;
  username: string;
  email: string;
  userStatus: string;
  role: string;
  openSettings: boolean;
  openAccountSettings: boolean
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    surname: "",
    username: "",
    email: "",
    userStatus: "",
    role: "",
    openSettings: false,
    openAccountSettings: false
  };
}

export default state;

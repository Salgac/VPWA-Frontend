export interface UserStateInterface {
  signedIn: boolean;
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
    username: "",
    email: "",
    userStatus: "",
    role: "",
    openSettings: false,
    openAccountSettings: false
  };
}

export default state;

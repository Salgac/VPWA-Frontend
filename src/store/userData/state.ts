export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  surname: string;
  username: string;
  email: string;
  userStatus: string;
  role: string;
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
    openAccountSettings: false
  };
}

export default state;

export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  surname: string;
  username: string;
  email: string;
  token: string;
  userStatus: string;
  openAccountSettings: boolean;
  openUserList: boolean
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    surname: "",
    username: "",
    email: "",
    token: "",
    userStatus: "",
    openAccountSettings: false,
    openUserList: false
  };
}

export default state;

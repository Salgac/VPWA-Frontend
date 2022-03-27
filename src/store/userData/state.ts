export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  surname: string;
  username: string;
  email: string;
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
    userStatus: "",
    openAccountSettings: false,
    openUserList: false
  };
}

export default state;

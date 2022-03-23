export interface UserStateInterface {
  signedIn: boolean;
  name: string;
  email: string;
  role: string
}

function state(): UserStateInterface {
  return {
    signedIn: false,
    name: "",
    email: "",
    role: "pleb"
  };
}

export default state;

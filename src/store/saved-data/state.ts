export interface UserStateInterface {
  signedIn: boolean;
}

function state(): UserStateInterface {
  return {
    signedIn: false,
  };
}

export default state;

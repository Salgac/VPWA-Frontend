import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  signInPopup (state: UserStateInterface/* context */): boolean {
    // your code
    return !state.signedIn;
  },
  getPfp(state: UserStateInterface): string {
    return 'https://avatars.dicebear.com/api/bottts/' + state.username + '.svg'
  }
};

export default getters;

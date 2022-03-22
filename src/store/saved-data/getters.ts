import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  signInPopup (state: UserStateInterface/* context */) {
    // your code
    return !state.signedIn;
  }
};

export default getters;

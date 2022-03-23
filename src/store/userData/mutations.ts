import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  signInOut(state: UserStateInterface, val: boolean) {
    state.signedIn = val;
  },

  openCloseSettings(state: UserStateInterface, val: boolean) {
    state.openSettings = val;
  },

  openCloseAccountSettings(state: UserStateInterface, val: boolean) {
    state.openAccountSettings = val;
  }
};

export default mutation;

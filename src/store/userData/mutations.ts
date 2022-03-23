import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  signInOut(state: UserStateInterface, val: boolean) {
    // your code
    state.signedIn = val;
  },
  addMessage(state: UserStateInterface, val: { author: string, time: string, text: string }) {
    state.messages.push(val);
  }
};

export default mutation;

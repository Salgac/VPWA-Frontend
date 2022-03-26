import { MutationTree } from 'vuex';
import { MessageStateInterface } from './state';

const mutation: MutationTree<MessageStateInterface> = {
  setCommand(state: MessageStateInterface, val: string) {
    state.currentCommand = val
  },
};

export default mutation;

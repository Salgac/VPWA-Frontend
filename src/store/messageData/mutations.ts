import { MutationTree } from 'vuex';
import { MessageStateInterface } from './state';

const mutation: MutationTree<MessageStateInterface> = {
  setCommand(state: MessageStateInterface, val: string) {
    state.currentCommand = val
  },
  addMessage(state: MessageStateInterface, val: { author: string, time: string, text: string }) {
    state.messages.push(val);
  }
};

export default mutation;

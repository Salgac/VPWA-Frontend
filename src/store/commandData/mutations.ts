import { MutationTree } from 'vuex';
import state, { CommandStateInterface } from './state';

const mutation: MutationTree<CommandStateInterface> = {
  setCommand(state: CommandStateInterface, val: string) {
    state.currentCommand = val
  },

  setMessage(state: CommandStateInterface, val: string) {
    state.commandMessage = val
  },

  setErrorBool(state: CommandStateInterface, val: boolean) {
    state.errorBool = val
  }
};

export default mutation;

import { MutationTree } from 'vuex';
import { CommandStateInterface } from './state';

const mutation: MutationTree<CommandStateInterface> = {
  setCommand(state: CommandStateInterface, val: string) {
    state.currentCommand = val
  },
};

export default mutation;

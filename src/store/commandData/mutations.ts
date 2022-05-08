import { MutationTree } from 'vuex';
import { CommandStateInterface } from './state';

const mutation: MutationTree<CommandStateInterface> = {
  setCommand(state: CommandStateInterface, val: string) {
    state.currentCommand = val
  },

  setMessage(state: CommandStateInterface, val: string) {
    state.commandMessage = val
  },

  setErrorBool(state: CommandStateInterface, val: boolean) {
    state.errorBool = val
  },

  setNotification(state: CommandStateInterface, val: {
    author: string,
    time: string,
    text: string,
    channelName: string,
  } | null) {
    state.notification = val;
  },

};

export default mutation;

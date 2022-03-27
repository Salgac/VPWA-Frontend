import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommandStateInterface } from './state';

const actions: ActionTree<CommandStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;

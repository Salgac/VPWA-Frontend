import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MessageStateInterface } from './state';

const actions: ActionTree<MessageStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;

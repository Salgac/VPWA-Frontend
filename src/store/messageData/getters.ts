import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MessageStateInterface } from './state';

const getters: GetterTree<MessageStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;

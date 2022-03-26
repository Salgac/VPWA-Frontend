import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CommandStateInterface } from './state';

const getters: GetterTree<CommandStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;

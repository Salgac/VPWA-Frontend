import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { MessageStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const messageDataModule: Module<MessageStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default messageDataModule;

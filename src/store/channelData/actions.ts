import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

import HttpRequest from "src/services/request";

const actions: ActionTree<ChannelStateInterface, StateInterface> = {
  async loadChannels({ commit }) {
    //load from server
    const response = await HttpRequest.get(
      "channels",
      this.state.userSavedData.token
    );
    const channels = response.channels;

    //add to store
    commit('setChannels', channels);
    if (channels.length != 0) {
      commit('setCurrentChannel', channels[0].channelName)
    }
  },

  async createChannel({ commit }, data) {
    //post to server
    const response = await HttpRequest.post(
      "channel", {
      channelName: data.name,
      isPrivate: data.isPrivate,
    },
      this.state.userSavedData.token
    );

    //test for errors
    if (response.hasOwnProperty("errors")) {
      alert(response.errors);
    } else {
      //add to store
      const channel = response.channel;
      commit('addChannel', channel);
      commit('setCurrentChannel', data.name)
    }
  },

  //delete channel call for admin
  async deleteChannel({ commit }, channelName) {
    const response = await HttpRequest.delete(
      "channel", {
      channelName: channelName,
    },
      this.state.userSavedData.token
    );

    if (response.hasOwnProperty("errors")) {
      alert("Channel deletion error!");
    } else {
      //remove from store
      commit('removeChannel', channelName);
    }
  }
};

export default actions;

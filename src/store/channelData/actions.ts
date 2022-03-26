import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

const actions: ActionTree<ChannelStateInterface, StateInterface> = {
  loadChannels({ commit }) {
    //TODO migrate to api call
    const data = [
      {
        channelName: "chatting",
        isPrivate: false,
        dropdown: [
          { label: "Leave", icon: "close" },
        ],
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
      },
      {
        channelName: "memes",
        isPrivate: false,
        dropdown: [
          { label: "Leave", icon: "close" },
        ],
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
      },
      {
        channelName: "music",
        isPrivate: false,
        dropdown: [
          { label: "Leave", icon: "close" },
          { label: "Delete", icon: "delete" },
        ],
        messages: [],
      },
      {
        channelName: "games",
        isPrivate: true,
        dropdown: [
          { label: "Leave", icon: "close" },
          { label: "Delete", icon: "delete" },
        ],
        messages: [],
      },
      {
        channelName: "coding",
        isPrivate: false,
        dropdown: [
          { label: "Leave", icon: "close" },
          { label: "Delete", icon: "delete" },
        ],
        messages: [],
      }];

    commit('setChannels', data);
    commit('setCurrentChannel', data[0].channelName)
  },

  loadChannelMessages({ commit }) {

  },

  createChannel({ commit }, data) {
    let channelObject = {
      channelName: data.name,
      isPrivate: data.isPrivate,
      dropdown: [
        { label: "Leave", icon: "close" },
        { label: "Delete", icon: "delete" },
      ],
      messages: [],
    }

    commit('addChannel', channelObject);
    commit('setCurrentChannel', data.name)
  },

  leaveChannel({ commit }, channelName) {
    commit('removeChannel', channelName);
  },

  //delete channel call for admin
  deleteChannel({ commit }, channelName) {
    commit('removeChannel', channelName);
  }
};

export default actions;

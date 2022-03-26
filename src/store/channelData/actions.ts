import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

const actions: ActionTree<ChannelStateInterface, StateInterface> = {
  loadChannels({ commit }) {
    //TODO migrate to api call
    const data = [
      {
        channelName: "chatting",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
        ],
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
      },
      {
        channelName: "memes",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Permissions", icon: "shield" },
          { label: "Rename", icon: "edit" },
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
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Permissions", icon: "shield" },
          { label: "Delete", icon: "delete" },
          { label: "Rename", icon: "edit" },
        ],
        messages: [],
      },
      {
        channelName: "games",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
        ],
        messages: [],
      },
      {
        channelName: "coding",
        icon: "tag",
        dropdown: [
          { label: "Invite", icon: "person_add" },
          { label: "Users", icon: "people" },
          { label: "Delete", icon: "delete" },
          { label: "Rename", icon: "edit" },
        ],
        messages: [],
      }];

    commit('setChannels', data);
  }
};

export default actions;

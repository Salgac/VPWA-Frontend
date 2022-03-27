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
        owner: "viktor",
        permissions: { owner: "kji-cq", user: "kji-c-" },
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
        users: [
          {
            name: "Viktor",
            surname: "Modroczký",
            email: "viktor@email.com",
            username: "viktor"
          },
          {
            name: "Jožko",
            surname: "Mrkvička",
            email: "jozko@email.sk",
            username: "jozko"
          },
          {
            name: "Janko",
            surname: "Ferko",
            email: "janko@email.sk",
            username: "janko"
          },
        ],
      },
      {
        channelName: "memes",
        isPrivate: false,
        owner: "viktor",
        permissions: { owner: "kji-cq", user: "kji-c-" },
        messages: [
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
          { author: "You", time: "12:43:08", text: "Hello world!" },
          { author: "Testy", time: "12:44:45", text: "I like turtles" },
        ],
        users: [
          {
            name: "Viktor",
            surname: "Modroczký",
            email: "viktor@email.com",
            username: "viktor"
          },
          {
            name: "Jožko2",
            surname: "Mrkvička2",
            email: "jozko2@email.sk",
            username: "jozko2"
          },
          {
            name: "Janko2",
            surname: "Ferko2",
            email: "janko2@email.sk",
            username: "janko2"
          },
        ],
      },
      {
        channelName: "music",
        isPrivate: false,
        owner: "jano",
        permissions: { owner: "kji-cq", user: "kji-c-" },
        messages: [],
        users: [
          {
            name: "Viktor",
            surname: "Modroczký",
            email: "viktor@email.com",
            username: "viktor"
          },
          {
            name: "Jožko",
            surname: "Mrkvička",
            email: "jozko@email.sk",
            username: "jozko"
          },
          {
            name: "Jano",
            surname: "Kováč",
            email: "jano@email.sk",
            username: "jano"
          },
          {
            name: "Dominik",
            surname: "Šalgovič",
            email: "dominik@email.sk",
            username: "dominik"
          },
        ],
      },
      {
        channelName: "games",
        isPrivate: true,
        owner: "dominik",
        permissions: { owner: "-jircq", user: "-ji-c-" },
        messages: [],
        users: [
          {
            name: "Jožko",
            surname: "Mrkvička",
            email: "jozko@email.sk",
            username: "jozko"
          },
          {
            name: "Jano",
            surname: "Kováč",
            email: "jano@email.sk",
            username: "jano"
          },
          {
            name: "Dominik",
            surname: "Šalgovič",
            email: "dominik@email.sk",
            username: "dominik"
          },
        ],
      },
      {
        channelName: "coding",
        isPrivate: false,
        owner: "dominik",
        permissions: { owner: "kji-cq", user: "kji-c-" },
        messages: [],
        users: [
          {
            name: "Viktor",
            surname: "Modroczký",
            email: "viktor@email.com",
            username: "viktor"
          },
          {
            name: "Jožko",
            surname: "Mrkvička",
            email: "jozko@email.sk",
            username: "jozko"
          },
          {
            name: "Jano",
            surname: "Kováč",
            email: "jano@email.sk",
            username: "jano"
          },
          {
            name: "Dominik",
            surname: "Šalgovič",
            email: "dominik@email.sk",
            username: "dominik"
          },
        ],
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
      owner: this.state.userSavedData.username,
      permissions: data.isPrivate ? { owner: "-jircq", user: "-ji-c-" } : { owner: "kji-cq", user: "kji-c-" },
      users: [
        {
          name: this.state.userSavedData.name,
          surname: this.state.userSavedData.surname,
          email: this.state.userSavedData.email,
          username: this.state.userSavedData.username
        }
      ],
      messages: [],
    }

    commit('addChannel', channelObject);
    commit('setCurrentChannel', data.name)
  },

  leaveChannel({ commit }, data: { channelName: string, username: string }) {
    commit('deleteChannelUser', data);
  },

  //delete channel call for admin
  deleteChannel({ commit }, channelName) {
    commit('removeChannel', channelName);
  }
};

export default actions;

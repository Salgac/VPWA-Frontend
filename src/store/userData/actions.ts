import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import HttpRequest from "src/services/request";

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async saveStatus({ commit }, status: string) {
    const response = await HttpRequest.post(
      "status",
      {
        status: status
      },
      this.state.userSavedData.token
    );

    if (response.hasOwnProperty("error")) {
      alert(response.error);
      return;
    }

    commit('setUserStatus', status);
  }
};

export default actions;

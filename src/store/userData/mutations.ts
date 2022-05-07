import { socket } from 'src/boot/ws';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  signInOut(state: UserStateInterface, val: boolean) {
    state.signedIn = val;
  },

  openCloseAccountSettings(state: UserStateInterface, val: boolean) {
    state.openAccountSettings = val;
  },

  setUserStatus(state: UserStateInterface, val: string) {
    state.userStatus = val;
  },

  setUsername(state: UserStateInterface, val: string) {
    state.username = val;
  },

  setEmail(state: UserStateInterface, val: string) {
    state.email = val;
  },

  setToken(state: UserStateInterface, val: string) {
    state.token = val;

  },

  openCloseUserList(state: UserStateInterface, val: boolean) {
    state.openUserList = val;
  },

  //reset state values to default
  reset(state) {
    //disconnect user
    socket.emit('end');

    //clear data
    state.signedIn = false;
    state.name = "";
    state.surname = "";
    state.username = "";
    state.email = "";
    state.token = "";
    state.userStatus = "";
  }
};

export default mutation;

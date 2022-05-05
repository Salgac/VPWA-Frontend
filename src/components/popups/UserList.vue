<template>
  <q-dialog v-model="openUserList">
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Users</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section>
            <div class="text-subtitle2">Username</div>
          </q-item-section>
          <q-item-section>
            <div class="text-subtitle2">User email</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section style="max-height: 50vh" class="scroll">
        <q-list>
          <q-item v-for="user in getUsers()" v-bind:key="user.username">
            <q-item-section>
              {{ user.username }}
            </q-item-section>
            <q-item-section>
              {{ user.email }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserList",

  methods: {
    getUsers() {
      /*
      let obj = this.$store.state.channelSavedData.channels.find(
        (ch) =>
          ch.channelName === this.$store.state.channelSavedData.currentChannel
      );
      return obj?.users;*/
      return []; //TODO add api call
    },
  },

  computed: {
    openUserList: {
      get() {
        return this.$store.state.userSavedData.openUserList;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseUserList", val);
      },
    },
  },
});
</script>

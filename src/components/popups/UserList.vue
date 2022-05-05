<template>
  <q-dialog v-model="openUserList">
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Users</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section style="max-height: 50vh" class="scroll">
        <q-list>
          <q-item v-for="user in users" v-bind:key="user.username">
            <q-avatar class="q-mb-sm">
              <img :src="getPFP(user.username)" />
            </q-avatar>
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

import HttpRequest from "src/services/request";

export default defineComponent({
  name: "UserList",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getPFP(author: string) {
      return `https://avatars.dicebear.com/api/bottts/${author}.svg`;
    },
  },
  watch: {
    openUserList: async function () {
      if (this.openUserList) {
        const response = await HttpRequest.get(
          "users",
          this.$store.state.userSavedData.token,
          {
            channelName: this.$store.state.channelSavedData.currentChannel,
          }
        );
        this.users = response.users;
      }
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

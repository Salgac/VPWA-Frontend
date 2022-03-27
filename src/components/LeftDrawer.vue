<template>
  <AccountBanner :username="username" :email="email" :userStatus="userStatus" />

  <q-scroll-area
    style="
      height: calc(100% - 150px - 50px);
      margin-top: 150px;
      border-right: 1px solid #ddd;
    "
  >
    <q-list>
      <ChannelBox
        v-for="channel in channels"
        :key="channel.channelName"
        :show="channel.users.some(u => u.username === $store.state.userSavedData.username)"
        v-bind="channel"
      />
      <!--
      <q-item v-if="!channels.length">No channels. Create or join one.</q-item>
      -->
      <q-item>
        <q-btn
          v-if="signedIn"
          label="Create a new channel"
          flat
          no-caps
          style="width: 100%"
          @click="openChannelCreation = !openChannelCreation"
        />
      </q-item>
    </q-list>
  </q-scroll-area>

  <q-toolbar v-if="signedIn" class="absolute-bottom bg-primary text-white">
    <q-btn-group push spread square flat style="width: 100%">
      <q-btn icon="logout" color="primary" @click="signOut" />
    </q-btn-group>
  </q-toolbar>
</template>

<script lang="ts">
import ChannelBox from "components/ChannelBox.vue";
import AccountBanner from "components/AccountBanner.vue";
import SignInForm from "components/SignInForm.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "LeftDrawer",

  components: {
    ChannelBox,
    AccountBanner,
    SignInForm,
  },

  methods: {
    signOut() {
      this.signedIn = !this.signedIn;
    },
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/signInOut", val);
      },
    },

    openChannelCreation: {
      get() {
        return this.$store.state.channelSavedData.openChannelCreation;
      },
      set(val: boolean) {
        this.$store.commit("channelSavedData/openCloseChannelCreation", val);
      },
    },

    username: {
      get() {
        return this.$store.state.userSavedData.username;
      },
      set() {},
    },

    email: {
      get() {
        return this.$store.state.userSavedData.email;
      },
      set() {},
    },

    userStatus: {
      get() {
        return this.$store.state.userSavedData.userStatus;
      },
      set() {},
    },

    channels: {
      get() {
        return this.$store.state.channelSavedData.channels;
      },
      set() {},
    },
  },
});
</script>

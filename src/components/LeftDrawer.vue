<template>
    <AccountBanner
      :username="username"
      :email="email"
      :userStatus="userStatus"
    />

    <q-scroll-area
      style=
      "
        height: calc(100% - 150px - 50px);
        margin-top: 150px;
        border-right: 1px solid #ddd
      "
    >
      <q-list>
        <ChannelBox
          v-for="channel in channels"
          :key="channel.channelName"
          v-bind="channel"
        />
      </q-list>
    </q-scroll-area>

    <q-toolbar v-if="signedIn" class="absolute-bottom bg-primary text-white">
      <q-btn-group
        push
        spread
        square
        flat
        style="width: 100%;"
      >
        <q-btn
          icon="settings"
          color="primary"
          @click="openSettings = !openSettings"
        />
        <q-btn
          icon="logout"
          color="primary"
          @click="signOut"
        />
      </q-btn-group>
    </q-toolbar>
</template>

<script lang="ts">
import ChannelBox from "components/ChannelBox.vue"
import AccountBanner from "components/AccountBanner.vue"
import SignInForm from "components/SignInForm.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "LeftDrawer",

  components: {
    ChannelBox,
    AccountBanner,
    SignInForm
  },

  methods: {
    signOut() {
      this.signedIn = !this.signedIn
    }
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    },

    openSettings: {
      get() {
        return this.$store.state.userSavedData.openSettings
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/openCloseSettings', val)
      }
    },

    username: {
      get() {
        return this.$store.state.userSavedData.username
      },
      set() {

      }
    },

    email: {
      get() {
        return this.$store.state.userSavedData.email
      },
      set() {

      }
    },

    userStatus: {
      get() {
        return this.$store.state.userSavedData.userStatus
      },
      set() {

      }
    },

    channels: {
      get() {
        return this.$store.state.channelSavedData.channels
      },
      set() {

      }
    }
  }
})
</script>

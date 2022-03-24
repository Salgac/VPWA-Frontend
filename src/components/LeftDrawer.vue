<template>
  <div>
    <AccountBanner
      :username="username"
      :email="email"
      :userStatus="userStatus"
    />

    <q-list padding>
      <ChannelBox
        v-for="channel in channels"
        :key="channel.channelName"
        v-bind="channel"
      />
    </q-list>

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
  </div>
</template>

<script lang="ts">
import ChannelBox from "components/ChannelBox.vue"
import AccountBanner from "components/AccountBanner.vue"
import SignInForm from "components/SignInForm.vue";

import { defineComponent } from "vue";

const channels = [
  {
    channelName: "chatting",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
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
  },
  {
    channelName: "games",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
    ],
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
  },
  {
    channelName: "chatting",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
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
  },
  {
    channelName: "games",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
    ],
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
  },
  {
    channelName: "chatting",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
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
  },
  {
    channelName: "games",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
    ],
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
  },
  {
    channelName: "chatting",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
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
  },
  {
    channelName: "games",
    icon: "tag",
    dropdown: [
      { label: "Invite", icon: "person_add" },
      { label: "Users", icon: "people" },
    ],
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
  },
];

export default defineComponent({
  name: "LeftDrawer",

  components: {
    ChannelBox,
    AccountBanner,
    SignInForm
  },

  data() {
    return {
      channels: channels,
    };
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
    }
  }
})
</script>

<template>
  <div>
    <AccountBanner :username="username" :email="email"/>
    <q-item-label header> Channels </q-item-label>
    <q-list padding>
      <ChannelBox
        v-for="channel in channels"
        :key="channel.channelName"
        v-bind="channel"
      />
    </q-list>
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
];

const username = "username123"
const email = "example@example.com";

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
      username: username,
      email: email
    };
  }
})
</script>

<template>
  <div v-if="signedIn">
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
  <div v-else>
    <SignInForm />
  </div>
</template>

<script>
import ChannelBox from "components/ChannelBox.vue"
import AccountBanner from "components/AccountBanner.vue"
import SignInForm from "components/SignInForm.vue";

import { defineComponent } from "vue";

const channels = [
  {
    channelName: "chatting",
    icon: "tag",
  },
  {
    channelName: "memes",
    icon: "tag",
  },
  {
    channelName: "music",
    icon: "tag",
  },
  {
    channelName: "games",
    icon: "tag",
  },
  {
    channelName: "coding",
    icon: "tag",
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
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn
      },
      set(val) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    }
  },
})
</script>

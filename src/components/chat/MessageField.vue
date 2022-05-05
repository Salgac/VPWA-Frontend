<template>
  <div v-if="signedIn" class="q-mr-sm" style="width: 100%">
    <q-infinite-scroll @load="onLoad" reverse>
      <template v-slot:loading>
        <div class="q-my-md absolute-center">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div class="q-pa-md row justify-center">
        <div v-if="$store.state.channelSavedData.currentChannel == ''">
          No channel open
        </div>
        <div v-else-if="!messages.length">Channel is empty.</div>
        <div
          style="width: 100%"
          v-for="(item, index) in messages"
          v-bind:key="index"
        >
          <q-chat-message
            :key="index"
            :name="item.author"
            :avatar="getPFP(item.author)"
            :text="[item.text]"
            :sent="item.author == $store.state.userSavedData.username"
            :stamp="formatTime(item.time)"
          />
        </div>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageField",

  methods: {
    onLoad(index: Number, done: Function) {
      //TODO implement this
      done();
    },
    getPFP(author: string) {
      return `https://avatars.dicebear.com/api/bottts/${author}.svg`;
    },
    formatTime(time: string) {
      return new Date(time).toLocaleString("sk-SK");
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

    messages: {
      get() {
        var channels = this.$store.state.channelSavedData.channels;
        var currentChannel = this.$store.state.channelSavedData.currentChannel;

        var obj = channels.find((ch) => ch.channelName === currentChannel);
        return obj?.messages ? obj.messages : [];
      },
      set() {},
    },
  },
});
</script>

<style>
.horizontal-element {
  display: inline-block;
}
</style>

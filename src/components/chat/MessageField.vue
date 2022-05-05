<template>
  <div v-if="signedIn" class="q-mr-sm" style="width: 100%">
    <q-scroll-area
      style="height: 90vh; max-width: 100%; min-height: 90vh"
      :delay="500"
      ref="scrollRef"
    >
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
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { QScrollArea } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageField",

  methods: {
    getPFP(author: string) {
      return `https://avatars.dicebear.com/api/bottts/${author}.svg`;
    },
    formatTime(time: string) {
      return new Date(time).toLocaleString("sk-SK");
    },
    setScroll() {
      const scroll = this.$refs["scrollRef"] as QScrollArea;
      if (scroll) {
        const scrollTarget = scroll.getScrollTarget();
        const offset = scrollTarget.scrollHeight;
        scroll.setScrollPosition("vertical", offset, 250);
      }
    },
  },
  watch: {
    "$store.state.channelSavedData.setScroll": function (val) {
      //set scroll after message was sent
      if (val) {
        this.setScroll();
        this.$store.commit("channelSavedData/setScroll", false);
      }
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

        //set scroll - note: timeout is needed because I dont know why - WILL NOT WORK WITHOUT IT
        setTimeout(() => {
          this.setScroll();
        }, 1);

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

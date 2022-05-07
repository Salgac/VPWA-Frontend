<template>
  <div v-if="signedIn" class="q-mr-sm" style="width: 100%">
    <q-scroll-area
      style="height: 90vh; max-width: 100%; min-height: 90vh"
      :delay="500"
      ref="scrollRef"
      @scroll="onScroll"
    >
      <div class="q-pa-md row justify-center">
        <div v-if="$store.state.channelSavedData.currentChannel.name == ''">
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
            :text="[prepareText(item.text)]"
            text-html
            :sent="item.author == $store.state.userSavedData.username"
            :stamp="formatTime(item.time)"
            :bg-color="getTag(item.text, 'bg')"
            :text-color="getTag(item.text, 'text')"
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
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    async onScroll(info: any) {
      if (info.verticalPosition < 100 && !this.isLoading) {
        this.isLoading = true;
        await this.loadMessages();
      }
    },
    async loadMessages() {
      await this.$store.dispatch("channelSavedData/loadMoreMessages");

      //scroll to old position
      this.setScroll("load");

      this.isLoading = false;
    },
    getPFP(author: string) {
      return `https://avatars.dicebear.com/api/bottts/${author}.svg`;
    },
    formatTime(time: string) {
      return new Date(time).toLocaleString("sk-SK");
    },
    setScroll(source: string) {
      const scroll = this.$refs["scrollRef"] as QScrollArea;
      if (scroll) {
        const scrollTarget = scroll.getScrollTarget();
        const offset = scrollTarget.scrollHeight;
        const size = scroll.getScroll().verticalContainerSize;

        switch (source) {
          case "auto":
            scroll.setScrollPosition("vertical", offset, 0);
            break;
          case "messageSent":
            scroll.setScrollPosition("vertical", offset, 250);
            break;
          case "load":
            scroll.setScrollPosition("vertical", 1630, 0);
          default:
            if (scroll.getScrollPosition().top >= offset - size - 100) {
              scroll.setScrollPosition("vertical", offset, 250);
            }
            break;
        }
      }
    },
    getTag(text: string, type: string) {
      const username = this.$store.state.userSavedData.username;
      const regExp = new RegExp(`^.*(?:^|\\s)@${username}\\b.*$`)
      switch (type) {
        case "bg":
          return regExp.test(text) ? "primary" : null;
        case "text":
          return regExp.test(text) ? "white" : null;
      }
    },
    prepareText(text: string) {
      //look for users tags and add strong effect to them
      const username = this.$store.state.userSavedData.username;
      const pattern = `@${username}`;
      const regExp = new RegExp(`^.*(?:^|\\s)@${username}\\b.*$`)

      return regExp.test(text)
        ? text
            .split(pattern)
            .join(
              `<strong style="color:blue;background:white">${pattern}</strong>`
            )
        : text;
    },
  },

  watch: {
    "$store.state.channelSavedData.setScroll": function (val) {
      //set scroll after message was sent
      if (val != "") {
        this.setScroll(val);
        this.$store.commit("channelSavedData/setScroll", "");
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
        this.isLoading = true;

        var channels = this.$store.state.channelSavedData.channels;
        var currentChannel = this.$store.state.channelSavedData.currentChannel;

        //set scroll - note: timeout is needed because I dont know why - WILL NOT WORK WITHOUT IT
        setTimeout(() => {
          this.setScroll("auto");
          setTimeout(() => {
            this.isLoading = false;
          }, 100);
        }, 0);

        var obj = channels.find((ch) => ch.channelName === currentChannel.name);

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

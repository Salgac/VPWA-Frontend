<template>
  <div>
    <CommandList v-if="openCommandList"/>
    <q-toolbar class="bg-grey-2 text-black row">
      <q-input
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
        v-on:keyup.enter="sendMessage"
      />
      <q-btn
        flat
        icon="insert_emoticon"
        class="q-mr-sm"
        v-on:click="addEmote"
      />
      <q-btn
        flat
        icon="attach_file"
        class="q-mr-sm"
        v-on:click="addFile"
      />
      <q-btn
        flat
        icon="send"
        v-on:click="sendMessage"
      />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandList from "components/CommandList.vue"

export default defineComponent({
  name: "MessageBox",

  components: {
    CommandList
  },

  data() {
    return {
      message: "",
      openCommandList: false
    };
  },

  methods: {
    addEmote() {
      //TODO
    },
    addFile() {
      //TODO
    },
    sendMessage() {
      //TODO send data
      console.log(this.message);

      this.newMessage = {
        author: "You",
        time: new Date().toLocaleTimeString(),
        text: this.message
      }

      //clear input
      this.message = "";
    },
  },

  computed: {
    currentCommand: {
      get() {
        return this.$store.state.messageSavedData.currentCommand
      },
      set(val: string) {
        this.$store.commit('messageSavedData/setCommand', val)
      }
    },

    newMessage: {
      get() {
        return this.$store.state.userSavedData.newMessage
      },
      set(val: { author: string, time: string, text: string }) {
        this.$store.commit('userSavedData/addMessage', val)
      }
    }
  },

  watch: {
    message(newMessage: string) {
      if (newMessage.indexOf('\\') == 0) {
        this.openCommandList = true
        this.currentCommand = newMessage.slice(1)
      }
      else {
        this.openCommandList = false
      }
    },

    currentCommand(newCommand: string) {
      this.message = "\\" + newCommand
    }
  }
});
</script>

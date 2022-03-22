<template>
  <div>
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

export default defineComponent({
  name: "MessageBox",

  data() {
    return {
      message: "",
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

      //clear input
      this.message = "";
    },
  },
});
</script>

<template>
  <div>
    <CommandList v-if="openCommandList" />
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
      <q-btn flat icon="send" v-on:click="sendMessage" />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandList from "components/CommandList.vue";

export default defineComponent({
  name: "MessageBox",

  components: {
    CommandList,
  },

  data() {
    return {
      message: "",
      openCommandList: false,
    };
  },

  methods: {
    notify(message: string, err: boolean) {
      this.$q.notify({
        color: err ? "red-5" : "green-4",
        textColor: "white",
        icon: err ? "warning" : "cloud_done",
        message: message
      });
    },
    removeWhitespaces(str: string) {
      return str.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")
    },
    sendMessage() {
      //TODO send data
      this.message = this.removeWhitespaces(this.message);
      console.log(this.message);

      if (this.message.length > 0) {
        if (this.message.charAt(0) != "/") {
          this.newMessage = {
            author: "You",
            time: new Date().toLocaleTimeString(),
            text: this.message,
          };
        } else {
          // command execution
          var commandParts = this.currentCommand.split(" ", 2);

          if (commandParts.length == 1) {
            if (commandParts[0] == "quit") {
              this.notify('Channel deleted', false);
            }
            else if (commandParts[0] == "cancel") {
              this.notify('Left channel', false);
            }
            else if (["join", "invite", "revoke", "kick"].includes(commandParts[0])) {
              this.notify('Provide command argument: ' + commandParts[0], true);
            }
            else {
              this.notify('Unknown command: ' + commandParts[0], true);
            }
          }
          else {
            if (commandParts[0] == "join") {
              this.notify('Created: ' + commandParts[1], false);
            }
            else if (commandParts[0] == "invite") {
              this.notify('Invited: ' + commandParts[1], false);
            }
            else if (commandParts[0] == "revoke") {
              this.notify('Revoked: ' + commandParts[1], false);
            }
            else if (commandParts[0] == "kick") {
              this.notify('Kicked: ' + commandParts[1], false);
            }
            else {
              this.notify('Unknown command: ' + commandParts[0], true);
            }
          }
        }
      }

      //clear input
      this.message = "";
    },
  },

  computed: {
    currentCommand: {
      get() {
        return this.$store.state.commandSavedData.currentCommand;
      },
      set(val: string) {
        this.$store.commit("commandSavedData/setCommand", val);
      },
    },

    newMessage: {
      get() {
        return this.$store.state.channelSavedData.newMessage;
      },
      set(val: { author: string; time: string; text: string }) {
        this.$store.commit("channelSavedData/addMessage", val);
      },
    },

    commands: {
      get() {
        return this.$store.state.commandSavedData.commands;
      },
      set() {},
    },
  },

  watch: {
    message(newMessage: string) {
      newMessage = this.removeWhitespaces(newMessage)
      if (newMessage.indexOf("/") == 0) {
        this.currentCommand = newMessage.slice(1).replace(/^\s/g, "");
        if (
          this.commands.some((i: {commandName: string, commandRole: string}) => i.commandName.includes(this.currentCommand))
        ) {
          this.openCommandList = true;
        } else {
          this.openCommandList = false;
        }
      } else {
        this.openCommandList = false;
      }
    },

    currentCommand(newCommand: string) {
      this.message = "/".concat(newCommand);
    },
  },
});
</script>

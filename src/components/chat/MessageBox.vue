<template>
  <div>
    <UserList />
    <CommandList v-if="openCommandList" />
    <q-toolbar class="bg-grey-2 text-black row">
      <q-input
        :disable="$store.state.channelSavedData.currentChannel == ''"
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
        v-on:keyup.enter="sendMessage"
      />
      <q-btn
        :disable="$store.state.channelSavedData.currentChannel == ''"
        flat
        icon="send"
        v-on:click="sendMessage"
      />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandList from "src/components/chat/CommandList.vue";
import UserList from "src/components/popups/UserList.vue";

export default defineComponent({
  name: "MessageBox",

  components: {
    CommandList,
    UserList,
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
        message: message,
      });
    },
    removeWhitespaces(str: string) {
      return str.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
    },
    sendMessage() {
      //TODO send data
      this.message = this.removeWhitespaces(this.message);
      console.log(this.message);

      if (this.message.length > 0) {
        if (this.message.charAt(0) != "/") {
          this.newMessage = {
            token: this.$store.state.userSavedData.token,
            author: this.$store.state.userSavedData.username,
            time: new Date().toLocaleTimeString(),
            text: this.message,
          };
        } else {
          // command execution
          var commandParts = this.currentCommand.split(" ", 3);

          if (commandParts.length == 1) {
            if (commandParts[0] == "list") {
              this.openUserList = true;
            } else if (commandParts[0] == "quit") {
              this.deleteChannel();
            } else if (commandParts[0] == "cancel") {
              this.removeChannelUser(
                this.$store.state.userSavedData.username,
                "Left channel"
              );
            } else if (
              ["join", "invite", "revoke", "kick"].includes(commandParts[0])
            ) {
              this.notify("Provide command argument: " + commandParts[0], true);
            } else {
              this.notify("Unknown command: " + commandParts[0], true);
            }
          } else if (commandParts.length == 2) {
            if (commandParts[0] == "join") {
              this.createPublic(commandParts[1]);
            } else if (commandParts[0] == "invite") {
              this.notify("Invited: " + commandParts[1], false);
            } else if (commandParts[0] == "revoke") {
              this.removeChannelUser(
                commandParts[1],
                "Revoked: " + commandParts[1]
              );
            } else if (commandParts[0] == "kick") {
              this.removeChannelUser(
                commandParts[1],
                "Kicked: " + commandParts[1]
              );
            } else {
              this.notify("Unknown command: " + commandParts[0], true);
            }
          } else {
            if (commandParts[0] == "join" || commandParts[2] == "private") {
              this.createPrivate(commandParts[1]);
            }
          }
        }
      }

      //clear input
      this.message = "";
    },

    createPrivate(channelName: string) {
      if (
        this.$store.state.channelSavedData.channels.some(
          (ch) => ch.channelName === channelName
        )
      ) {
        this.notify("Channel name '" + channelName + "' is taken", true);
      } else {
        this.$store.dispatch("channelSavedData/createChannel", {
          name: channelName,
          isPrivate: true,
        });
        this.notify("Created private: " + channelName, false);
      }
    },

    createPublic(channelName: string) {
      if (
        this.$store.state.channelSavedData.channels.some(
          (ch) => ch.channelName === channelName
        )
      ) {
        this.notify("Channel name '" + channelName + "' is taken", true);
      } else {
        this.$store.dispatch("channelSavedData/createChannel", {
          name: channelName,
          isPrivate: false,
        });
        this.notify("Created public: " + channelName, false);
      }
    },

    removeChannelUser(username: string, message: string) {
      this.$store.dispatch("channelSavedData/leaveChannel", {
        channelName: this.$store.state.channelSavedData.currentChannel,
        username: username,
      });
      this.notify(message, false);
    },

    deleteChannel() {
      this.$store.dispatch(
        "channelSavedData/deleteChannel",
        this.$store.state.channelSavedData.currentChannel
      );
      this.notify("Channel deleted", false);
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
      set(val: { author: string; time: string; text: string, token: string }) {
        this.$store.commit("channelSavedData/addMessage", val);
      },
    },

    commands: {
      get() {
        return this.$store.state.commandSavedData.commands;
      },
      set() {},
    },

    openUserList: {
      get() {
        return this.$store.state.userSavedData.openUserList;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseUserList", val);
      },
    },
  },

  watch: {
    message(newMessage: string) {
      newMessage = this.removeWhitespaces(newMessage);
      if (newMessage.indexOf("/") == 0) {
        this.currentCommand = newMessage.slice(1).replace(/^\s/g, "");
        if (
          this.commands.some((i: { commandName: string }) =>
            i.commandName.includes(this.currentCommand)
          )
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

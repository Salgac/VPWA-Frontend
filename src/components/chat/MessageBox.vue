<template>
  <div>
    <UserList />
    <ErrorPopup />
    <CommandList v-if="openCommandList" />
    <q-toolbar class="bg-grey-2 text-black row">
      <q-input
        :disable="$store.state.channelSavedData.currentChannel.name == ''"
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
        v-on:keyup.enter="onMessageSend"
      />
      <q-btn
        :disable="$store.state.channelSavedData.currentChannel.name == ''"
        flat
        icon="send"
        v-on:click="onMessageSend"
      />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandList from "src/components/chat/CommandList.vue";
import UserList from "src/components/popups/UserList.vue";
import ErrorPopup from "src/components/popups/ErrorPopup.vue";
import { socket } from "src/boot/ws";

export default defineComponent({
  name: "MessageBox",

  components: {
    CommandList,
    UserList,
    ErrorPopup,
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
      this.newMessage = {
        author: this.$store.state.userSavedData.username,
        channelName: this.$store.state.channelSavedData.currentChannel.name,
        time: new Date().toISOString(),
        text: this.message,
      };
      socket.emit("addMessage", {
        token: this.$store.state.userSavedData.token,
        userName: this.$store.state.userSavedData.username,
        channelName: this.$store.state.channelSavedData.currentChannel.name,
        time: new Date().toISOString(),
        text: this.message,
      });
    },
    onMessageSend() {
      this.message = this.removeWhitespaces(this.message);

      //parse message
      if (this.message.length > 0) {
        if (this.message.charAt(0) != "/") {
          this.sendMessage();
        } else {
          this.executeCommand();
        }
      }
      //set scroll
      this.$store.commit("channelSavedData/setScroll", "messageSent");

      //clear input
      this.message = "";
    },
    executeCommand() {
      // command execution
      var commandParts = this.currentCommand.split(" ", 3);

      if (commandParts.length == 1) {
        if (commandParts[0] == "list") {
          this.openUserList = true;
        } else if (commandParts[0] == "quit") {
          this.deleteChannel();
        } else if (commandParts[0] == "cancel") {
          this.removeChannelUser(
            this.$store.state.channelSavedData.currentChannel.name,
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
          this.errorBool = false;
          this.commandMessage = "";
          socket.emit("invite", {
            token: this.$store.state.userSavedData.token,
            fromUser: this.$store.state.userSavedData.username,
            toUser: commandParts[1],
            channel: this.$store.state.channelSavedData.currentChannel,
          });
          this.notify("Invited: " + commandParts[1], false);
        } else if (commandParts[0] == "revoke") {
          this.removeChannelUser(
            commandParts[1],
            "Revoked: " + commandParts[1]
          );
        } else if (commandParts[0] == "kick") {
          this.removeChannelUser(commandParts[1], "Kicked: " + commandParts[1]);
        } else {
          this.notify("Unknown command: " + commandParts[0], true);
        }
      } else {
        if (commandParts[0] == "join" || commandParts[2] == "private") {
          this.createPrivate(commandParts[1]);
        }
      }
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

    removeChannelUser(userName: string, message: string) {
      //only owner can revoke in a private channel
      const currentChannel = this.$store.state.channelSavedData.currentChannel;
      const user = this.$store.state.userSavedData.username;

      if (currentChannel.isPrivate) {
        if (currentChannel.owner == user) {
          if (userName == user) {
            this.notify(
              "Uh oh! Revoking yourself would create a wormhole! To delete this channel use '/quit' command.",
              true
            );
            return;
          }

          //emit to server
          socket.emit("revokeUser", {
            token: this.$store.state.userSavedData.token,
            channelName: currentChannel.name,
            userName: userName,
          });
          this.notify(message, false);
        } else {
          //
          this.notify("Only channel owner can revoke users!", true);
        }
      } else {
        this.notify("Revoke command only works in private channels!", true);
      }
    },

    deleteChannel() {
      this.$store.dispatch(
        "channelSavedData/deleteChannel",
        this.$store.state.channelSavedData.currentChannel.name
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
      set(val: {
        author: string;
        time: string;
        text: string;
        channelName: string;
      }) {
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

    commandMessage: {
      get() {
        return this.$store.state.commandSavedData.commandMessage;
      },
      set(val: string) {
        this.$store.commit("commandSavedData/setMessage", val);
      },
    },

    errorBool: {
      get() {
        return this.$store.state.commandSavedData.errorBool;
      },
      set(val: boolean) {
        this.$store.commit("commandSavedData/setErrorBool", val);
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

<template>
  <div>
    <q-list padding>
      <CommandItem
        v-for="command in commands"
        :key="command.commandName"
        :commandName="command.commandName"
        :show="command.commandName.includes(currentCommand)"
        :disable="!enabledCommand(command.commandName)"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandItem from "components/chat/CommandItem.vue";

const permissionsPrivate = { owner: "l-jircq", user: "l-ji-c-" };
const permissionsPublic = { owner: "lkji-cq", user: "lkji-c-" };

export default defineComponent({
  name: "CommandList",

  components: {
    CommandItem,
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

    commands: {
      get() {
        return this.$store.state.commandSavedData.commands;
      },
      set() {},
    },
  },

  methods: {
    enabledCommand(commandName: string): boolean {
      var res = false;
      let currentChannelObj = this.$store.state.channelSavedData.channels.find(
        (ch) =>
          ch.channelName === this.$store.state.channelSavedData.currentChannel
      );
      if (currentChannelObj == undefined) {
        return res;
      }

      let permissions = currentChannelObj.isPrivate ? permissionsPrivate : permissionsPublic;

      if (currentChannelObj.owner == this.$store.state.userSavedData.username) {
        if (permissions.owner.includes(commandName.charAt(0))) {
          res = true;
        } else {
          res = false;
        }
      } else {
        if (permissions.user.includes(commandName.charAt(0))) {
          res = true;
        } else {
          res = false;
        }
      }
      return res;
    },
  },
});
</script>

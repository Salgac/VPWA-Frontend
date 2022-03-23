<template>
  <div>
    <q-list padding>
      <CommandItem
        v-for="command in commands"

        :key="command.commandName"
        :commandName="command.commandName"
        :commandRole="command.commandRole"
        :show="command.commandName.includes(currentCommand)"
        :disable="command.commandRole != currentUserRole"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandItem from "components/CommandItem.vue"

const commands = [
  { commandName: "ban", commandRole: "admin" },
  { commandName: "createChannel", commandRole: "admin" },
  { commandName: "invite", commandRole: "pleb" }
];

export default defineComponent({
  name: "CommandList",

  components: {
    CommandItem
  },

  data() {
    return {
      commands: commands
    }
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

    currentUserRole: {
      get() {
        return this.$store.state.userSavedData.role
      },
      set() {

      }
    }
  },
})
</script>

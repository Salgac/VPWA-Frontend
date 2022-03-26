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

export default defineComponent({
  name: "CommandList",

  components: {
    CommandItem
  },

  computed: {
    currentCommand: {
      get() {
        return this.$store.state.commandSavedData.currentCommand
      },
      set(val: string) {
        this.$store.commit('commandSavedData/setCommand', val)
      }
    },

    currentUserRole: {
      get() {
        return this.$store.state.userSavedData.role
      },
      set() {

      }
    },

    commands: {
      get() {
        return this.$store.state.commandSavedData.commands
      },
      set() {

      }
    }
  },
})
</script>

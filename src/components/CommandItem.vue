<template>
  <div>
    <q-item
      v-if="show"
      clickable
      v-ripple
      dense
      :disable="disable"
      @click="currentCommand = commandName"
    >
      <q-item-section>
        <q-item-label>
          <b>Command: </b>{{ commandName }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    commandName: {
      type: String,
      required: true
    },

    disable: {
      type: Boolean,
      required: true
    },

    show: {
      type: Boolean,
      required: true
    }
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
  },
});
</script>

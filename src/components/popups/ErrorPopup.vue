<template>
  <q-dialog v-model="errorBool">
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div style="color: red" class="text-h6">Error</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section style="max-height: 50vh" class="scroll">
        {{ commandMessage }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    commandMessage: {
      get() {
        return this.$store.state.commandSavedData.commandMessage
      },
      set(val: string) {
        this.$store.commit("commandSavedData/setMessage", val);
      }
    },

    errorBool: {
      get() {
        return this.$store.state.commandSavedData.errorBool
      },
      set(val: boolean) {
        this.$store.commit("commandSavedData/setErrorBool", val);
      }
    }
  }
})
</script>

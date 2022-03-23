<template>
  <q-dialog v-model="openSettings">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Settings</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-avatar icon="people"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>test</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Settings",

  computed: {
    openSettings: {
      get() {
        return this.$store.state.userSavedData.openSettings
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/openCloseSettings', val)
      }
    }
  }
});
</script>

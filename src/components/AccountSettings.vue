<template>
  <q-dialog v-model="openAccountSettings">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Account</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <SetStatus />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SetStatus from "components/SetStatus.vue"

export default defineComponent({
  name: "AccountSettings",

  components: {
    SetStatus
  },

  computed: {
    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseAccountSettings", val)
      }
    }
  }
});
</script>

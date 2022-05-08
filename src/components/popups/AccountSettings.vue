<template>
  <q-dialog v-model="openAccountSettings">
    <q-card style="max-width: 80vw">
      <q-card-section class="q-pa-lg">
        <SetStatus />
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <q-item>
          <q-item-section> Name and surname: </q-item-section>
          <q-item-section> {{ user.name + ' ' + user.surname }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section> Username: </q-item-section>
          <q-item-section> {{ user.username }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section> Email: </q-item-section>
          <q-item-section> {{ user.email }}</q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SetStatus from "components/popups/SetStatus.vue";

export default defineComponent({
  name: "AccountSettings",

  data() {
    return {
      user: this.$store.state.userSavedData,
    };
  },

  components: {
    SetStatus,
  },

  computed: {
    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseAccountSettings", val);
      },
    },
  },

  methods: {},
});
</script>

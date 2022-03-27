<template>
  <q-item>
    <q-item-section side>
      <q-item-label>Set status</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-btn-toggle
        v-model="userStatus"
        :options="
          statusOptions.map((op) => ({ value: op.name, slot: op.name }))
        "
      >
        <template
          v-for="statusOption in statusOptions"
          #[statusOption.name]
          class="row items-center no-wrap"
          v-bind:key="statusOption"
        >
          {{ statusOption.label }}
          <q-icon right :name="statusOption.icon" :color="statusOption.color" />
        </template>
      </q-btn-toggle>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const statusOptions = [
  { name: "on", label: "Online", icon: "circle", color: "green" },
  { name: "off", label: "Offline", icon: "circle", color: "grey" },
  {
    name: "dnd",
    label: "Do Not Disturb",
    icon: "do_not_disturb_on",
    color: "red",
  },
];

export default defineComponent({
  name: "SetStatus",

  data() {
    return {
      statusOptions,
    };
  },

  computed: {
    userStatus: {
      get() {
        return this.$store.state.userSavedData.userStatus;
      },
      set(val: string) {
        this.$store.commit("userSavedData/setUserStatus", val);
      },
    },
  },
});
</script>

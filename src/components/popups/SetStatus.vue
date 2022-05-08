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
          v-bind:key="statusOption.name"
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
  { name: "online", label: "Online", icon: "circle", color: "green" },
  { name: "offline", label: "Offline", icon: "circle", color: "grey" },
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

  watch: {
    "$store.state.userSavedData.userStatus": function (next, prev) {
      //update missing messages with change from offline\
       if (prev == 'offline') {
          this.$store.dispatch("channelSavedData/loadChannels");
        }
    },
  },

  computed: {
    userStatus: {
      get():string {
        return this.$store.state.userSavedData.userStatus;
      },
      set(val: string) {
        this.$store.dispatch("userSavedData/saveStatus", val);
      },
    },
  },
});
</script>

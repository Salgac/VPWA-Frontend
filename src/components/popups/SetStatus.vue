<template>
  <q-item>
    <q-item-section side>
      <q-item-label>Set status</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-btn-toggle
        v-if="!$q.platform.is.mobile"
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
      <q-btn-dropdown
        v-else
        label="Set Status"
        dropdown-icon="expand_more"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="option in statusOptions"
            :key="option.name"
            @click="userStatus = option.name"
            :active="option.name == userStatus"
          >
            <q-item-section>
              <q-item-label>{{ option.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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

  computed: {
    userStatus: {
      get() {
        return this.$store.state.userSavedData.userStatus;
      },
      set(val: string) {
        this.$store.dispatch("userSavedData/saveStatus", val);
        if (val == 'online') {
          this.$store.dispatch("channelSavedData/loadChannels");
        }
      },
    },
  },
});
</script>

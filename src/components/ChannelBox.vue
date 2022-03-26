<template>
  <div>
    <q-item
      :active="channelName == $store.state.channelSavedData.currentChannel"
      active-class="active-style"
    >
      <q-item-section>
        <q-btn
          v-if="signedIn"
          :label="channelName"
          flat
          :icon="isPrivate ? 'lock' : 'tag'"
          no-caps
          rounded
          align="left"
          @click="setChannel"
        />
        <q-skeleton v-else type="QBtn" width="100%" />
      </q-item-section>
      <q-item-section avatar>
        <q-btn-dropdown v-if="signedIn" flat rounded dropdown-icon="more_vert">
          <q-list>
            <q-item
              v-for="item in dropdown"
              :key="item.label"
              clickable
              v-close-popup
              v-on:click="handleDropdown(item.label, channelName)"
            >
              <q-item-section side>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-skeleton v-else type="QBtn" width="100%" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type DropdownType = {
  icon: string;
  label: string;
}[];

export default defineComponent({
  name: "ChannelBox",

  props: {
    channelName: {
      type: String,
      required: true,
    },

    isPrivate: {
      type: Boolean,
      required: true,
    },

    dropdown: {
      type: Object as () => DropdownType,
      required: true,
    },
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/signInOut", val);
      },
    },
  },

  methods: {
    setChannel() {
      this.$store.commit(
        "channelSavedData/setCurrentChannel",
        this.channelName
      );
    },

    handleDropdown(label: string, channelName: string) {
      switch (label) {
        case "Leave":
          this.$store.dispatch("channelSavedData/leaveChannel", channelName);
          break;
        case "Delete":
          this.$store.dispatch("channelSavedData/deleteChannel", channelName);
          break;
      }
    },
  },
});
</script>


<style lang="scss" scoped>
.active-style {
  background: #e2e2e2;
}
</style>

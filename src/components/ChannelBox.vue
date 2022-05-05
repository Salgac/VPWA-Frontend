<template>
  <div>
    <q-item
      v-if="show"
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
          :color="channelName == $store.state.channelSavedData.topChannelName ? 'red' : 'primary'"
        />
        <q-skeleton v-else type="QBtn" width="100%" />
      </q-item-section>
      <q-item-section avatar>
        <q-btn-dropdown v-if="signedIn" flat rounded dropdown-icon="more_vert">
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-on:click="removeChannel(channelName)"
            >
              <q-item-section side>
                <q-icon name="close" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Leave</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="owner == $store.state.userSavedData.username"
              clickable
              v-close-popup
              v-on:click="removeChannel(channelName)"
            >
              <q-item-section side>
                <q-icon name="delete" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Delete</q-item-label>
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

    owner: {
      type: String,
      required: true,
    },

    show: {
      type: Boolean,
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
        { name: this.channelName, owner: this.owner, isPrivate: this.isPrivate }
      );
    },

    removeChannel(channelName: string) {
      this.$store.dispatch("channelSavedData/deleteChannel", channelName);
    },
  },
});
</script>


<style lang="scss" scoped>
.active-style {
  background: #e2e2e2;
}
</style>

<template>
  <q-dialog v-model="openSettings">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Create new channel</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="channelName" autofocus />
      </q-card-section>

      <q-card-actions>
        <q-btn
          flat
          label="Create private channel"
          v-close-popup
          @click="createPrivate"
          :disable="!channelName.length"
        />
        <q-btn
          flat
          label="Create public channel"
          v-close-popup
          @click="createPublic"
          :disable="!channelName.length"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateChannel",

  data() {
    return {
      channelName: "",
    };
  },

  methods: {
    createPrivate() {
      this.$store.dispatch("channelSavedData/createChannel", {
        name: this.channelName,
        isPrivate: true,
      });
      this.channelName = "";
    },

    createPublic() {
      this.$store.dispatch("channelSavedData/createChannel", {
        name: this.channelName,
        isPrivate: false,
      });
      this.channelName = "";
    },
  },

  computed: {
    openSettings: {
      get() {
        return this.$store.state.userSavedData.openSettings;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseSettings", val);
      },
    },
  },
});
</script>

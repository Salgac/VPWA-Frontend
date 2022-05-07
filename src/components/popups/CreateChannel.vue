<template>
  <q-dialog v-model="openChannelCreation">
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
    notify(message: string, err: boolean) {
      this.$q.notify({
        color: err ? "red-5" : "green-4",
        textColor: "white",
        icon: err ? "warning" : "cloud_done",
        message: message,
      });
    },
    async createPrivate() {
      if (
        this.$store.state.channelSavedData.channels.some(
          (ch) => ch.channelName === this.channelName
        )
      ) {
        this.notify("Channel name '" + this.channelName + "' is taken", true);
      } else {
        const res = await this.$store.dispatch(
          "channelSavedData/createChannel",
          {
            name: this.channelName,
            isPrivate: true,
          }
        );

        //message
        if (res) this.notify(res, true);
        else this.notify(`Created private channel: ${this.channelName}`, false);

        //reset
        this.channelName = "";
      }
    },

    async createPublic() {
      if (
        this.$store.state.channelSavedData.channels.some(
          (ch) => ch.channelName === this.channelName
        )
      ) {
        this.notify("Channel name '" + this.channelName + "' is taken", true);
      } else {
        const res = await this.$store.dispatch(
          "channelSavedData/createChannel",
          {
            name: this.channelName,
            isPrivate: false,
          }
        );

        //message
        if (res) this.notify(res, true);
        else this.notify(`Joined channel: ${this.channelName}`, false);

        //reset
        this.channelName = "";
      }
    },
  },

  computed: {
    openChannelCreation: {
      get() {
        return this.$store.state.channelSavedData.openChannelCreation;
      },
      set(val: boolean) {
        this.$store.commit("channelSavedData/openCloseChannelCreation", val);
      },
    },
  },
});
</script>

<template>
  <div>
    <q-item
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon
          v-if="signedIn"
          :name="icon"
        />
        <q-skeleton
          v-else
          type="QAvatar"
          square
        />
      </q-item-section>

      <q-item-section>
        <q-item-label v-if="signedIn">
          {{ channelName }}
        </q-item-label>
        <q-skeleton
          v-else
          type="rect"
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChannelBox',

  props: {
    channelName: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    }
  },
})
</script>

<template>
  <div>
    <q-item
      clickable
      tag="a"
      target="_blank"
      v-ripple
    >
      <q-item-section avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ channelName }}</q-item-label>
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
  }
})
</script>

<template>
  <div>
    <q-img
      :src="bannerPhoto"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar>
          <img :src="profilePhoto">
        </q-avatar>
        <div><b>{{ username }}</b></div>
        <div>{{ email }}</div>
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'AccountBanner',

  props: {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    profilePhoto: {
      type: String,
      default: 'https://cdn.quasar.dev/img/boy-avatar.png'
    },

    bannerPhoto: {
      type: String,
      default: 'https://cdn.quasar.dev/img/material.png'
    }
  }
})
</script>

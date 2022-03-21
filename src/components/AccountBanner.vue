<template>
  <div>
    <q-img
      :src="bannerPhoto"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <div class="horizontal-element">
          <q-item clickable>
            <q-item-section>
              <q-avatar>
                <img :src="profilePhoto">
              </q-avatar>
              <b>{{ username }}</b>
              {{ email }}
            </q-item-section>
          </q-item>
        </div>
        <div class="horizontal-element">
          <div>
            <q-btn
              icon="settings"
              flat
            />
          </div>
          <div>
            <q-btn
              icon="logout"
              flat
              @click="signedIn = !signedIn"
            />
          </div>
        </div>
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
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userStateInterface.signedIn
      },
      set(val) {
        this.$store.commit('userStateInterface/signInOut', val)
      }
    }
  },
})
</script>

<style>
.horizontal-element {
  display: inline-block;
}
</style>

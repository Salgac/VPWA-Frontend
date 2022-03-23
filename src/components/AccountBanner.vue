<template>
  <div>
    <q-img
      :src="bannerPhoto"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <div class="horizontal-element">
          <q-item
            clickable
            @click="openAccountSettings = !openAccountSettings"
          >
            <q-item-section>
              <q-avatar
                v-if="signedIn"
              >
                <img :src="profilePhoto">
              </q-avatar>
              <q-skeleton
                type="QAvatar"
                v-else
              />
              <b v-if="signedIn">
                {{ username }}
              </b>
              <q-skeleton
                v-else
                type="text"
                width="96px"
              />
              <div v-if="signedIn">
                {{ email }}
              </div>
              <q-skeleton
                v-else
                type="text"
                width="128px"
              />
            </q-item-section>
          </q-item>
        </div>
        <div
          v-if="signedIn"
          class="horizontal-element"
        >
          <div>
            <q-btn
              icon="settings"
              flat
              @click="openSettings = !openSettings"
            />
          </div>
          <div>
            <q-btn
              icon="logout"
              flat
              @click="signOut"
            />
          </div>
        </div>
      </div>
    </q-img>
  </div>
</template>

<script lang="ts">
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
        return this.$store.state.userSavedData.signedIn
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    },

    openSettings: {
      get() {
        return this.$store.state.userSavedData.openSettings
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/openCloseSettings', val)
      }
    },

    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/openCloseAccountSettings', val)
      }
    }
  },

  methods: {
    signOut() {
      this.signedIn = !this.signedIn
    }
  }
})
</script>

<style>
.horizontal-element {
  display: inline-block;
}
</style>

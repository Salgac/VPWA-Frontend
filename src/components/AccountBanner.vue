<template>
  <div>
    <q-img
      class="absolute-top"
      src="../../public/logo/banner.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent" style="width: 100%;">
        <q-item
          clickable
          @click="openAccountSettings = !openAccountSettings"
        >
          <q-item-section>
            <q-avatar
              class="q-mb-sm"
              v-if="signedIn"
            >
              <img :src="getPfp">
            </q-avatar>
            <q-skeleton
              type="QAvatar"
              v-else
            />
            <div v-if="signedIn">
              <q-icon
                v-if="userStatus == 'online'"
                left
                name="circle"
                color="green"
                size="xs"
              />
              <q-icon
                v-else-if="userStatus == 'offline'"
                left
                name="circle"
                color="grey"
                size="xs"
              />
              <q-icon
                v-else-if="userStatus == 'dnd'"
                left
                name="do_not_disturb_on"
                color="red"
                size="xs"
              />
              <b>
                {{ username }}
              </b>
            </div>
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

    userStatus: {
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
    },

    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/openCloseAccountSettings', val)
      }
    },
    getPfp(): string {
      return this.$store.getters["userSavedData/getPfp"];
    }
  },
})
</script>

<style>
.horizontal-element {
  display: inline-block;
}
</style>

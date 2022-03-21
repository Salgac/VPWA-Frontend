<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Poormans Discord </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <LeftDrawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered>
      <MessageBox v-if="signedIn"/>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import LeftDrawer from "components/LeftDrawer.vue";
import MessageBox from "components/MessageBox.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LeftDrawer,
    MessageBox,
  },

  data() {
    return {
      leftDrawerOpen: false
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn
      },
      set(val) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    }
  },
});
</script>

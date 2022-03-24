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

        <div>Viktor Modroczký & Dominik Šalgovič</div>
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
      <MessageBox />
    </q-footer>
  </q-layout>
  <SignInForm />
  <Settings />
  <AccountSettings />
</template>

<script lang="ts">
import LeftDrawer from "components/LeftDrawer.vue";
import MessageBox from "components/MessageBox.vue";
import SignInForm from "components/SignInForm.vue";
import Settings from "components/Settings.vue";
import AccountSettings from "components/AccountSettings.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LeftDrawer,
    MessageBox,
    SignInForm,
    Settings,
    AccountSettings
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

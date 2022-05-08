<template>
  <q-layout view="lHh LpR lFf">
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

        <q-toolbar-title class="appname"> Poormans Discord </q-toolbar-title>

        <p class="by">By:</p>
        <div class="names">
          <p>Viktor Modroczký</p>
          <p>Dominik Šalgovič</p>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
  <CreateChannel />
  <AccountSettings />
</template>

<script lang="ts">
import LeftDrawer from "components/LeftDrawer.vue";
import MessageBox from "src/components/chat/MessageBox.vue";
import SignInForm from "components/SignInForm.vue";
import CreateChannel from "src/components/popups/CreateChannel.vue";
import AccountSettings from "src/components/popups/AccountSettings.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LeftDrawer,
    MessageBox,
    SignInForm,
    CreateChannel,
    AccountSettings,
  },

  data() {
    return {
      leftDrawerOpen: false,
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
        return this.$store.state.userSavedData.signedIn;
      },
      set(val) {
        this.$store.commit("userSavedData/signInOut", val);
      },
    },
  },
  beforeMount() {
    //
  },
});
</script>

<style lang="scss" scoped>

.appname{
  text-overflow: none;
  white-space: nowrap;
  overflow:visible;

  font-family:"Orbitron";
  letter-spacing: 0.03em;
}

.by{
  margin:auto; 
  padding-right: 1em;

  @media screen and (max-width: 440px){
    display:none;
  }
}

.names{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden;

  @media screen and (max-width: 420px){
    display:none;
  }

  p{
    padding: 0;
    margin:0;
  }
}
</style>

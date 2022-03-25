<template>
  <q-dialog v-model="openAccountSettings" @hide="resetEdit">
    <q-card style="max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Account</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <SetStatus />
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <q-item>
          <q-item-section side>
            <q-item-label>Username</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-input
              class="q-mb-md"
              name="Username"
              rounded
              standout
              :placeholder="username"
              v-model="inputUsername"
              :readonly="usernameEditDisabled"
              no-error-icon
              :rules="usernameRule"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="usernameEditDisabled ? 'edit' : 'edit_off'"
                  class="cursor-pointer"
                  @click="triggerEdit"
                />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-btn
          v-if="!usernameEditDisabled && inputUsername.length > 0"
          label="Save Changes"
          v-close-popup
          @click="changeUsername"
          flat
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SetStatus from "components/SetStatus.vue"

export default defineComponent({
  name: "AccountSettings",

  data() {
    return {
      inputUsername: "",
      usernameEditDisabled: true,
      usernameRule: [ (val: string) => (val.length > 0) || 'Username is required' ]
    }
  },

  components: {
    SetStatus
  },

  computed: {
    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseAccountSettings", val)
      }
    },

    username: {
      get() {
        return this.$store.state.userSavedData.username
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/setUsername", val)
      }
    }
  },

  methods: {
    triggerEdit() {
      this.usernameEditDisabled = !this.usernameEditDisabled
      this.inputUsername = ""
    },

    resetEdit() {
      this.usernameEditDisabled = true
      this.inputUsername = ""
    },

    changeUsername() {
      this.username = this.inputUsername
    }
  }
});
</script>

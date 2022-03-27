<template>
  <q-dialog
    v-model="openAccountSettings"
    @hide="
      resetUsernameEdit();
      resetPasswordEdit();
    "
  >
    <q-card style="max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Account</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
              :error="!isValidUsername"
              error-message="Username is required"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="usernameEditDisabled ? 'edit' : 'edit_off'"
                  class="cursor-pointer"
                  @click="triggerUsernameEdit"
                />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>
            <q-item-label>Password</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-input
              class="q-mb-md"
              name="Password"
              rounded
              standout
              v-model="inputPassword"
              :readonly="passwordEditDisabled"
              no-error-icon
              :type="showPassword ? 'text' : 'password'"
              :error="!isValidPassword"
              error-message="Min. 8 characters, at least 1 upper- and lowercase letter, number and special character"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="passwordEditDisabled ? 'edit' : 'edit_off'"
                  class="cursor-pointer"
                  @click="triggerPasswordEdit"
                />
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-btn
          v-if="!usernameEditDisabled"
          label="Save username"
          @click="
            saveUsername();
            resetUsernameEdit();
          "
          flat
        />
        <q-btn
          v-if="!passwordEditDisabled"
          label="Save password"
          @click="
            savePassword();
            resetPasswordEdit();
          "
          flat
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SetStatus from "components/popups/SetStatus.vue";

export default defineComponent({
  name: "AccountSettings",

  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      showPassword: false,
      usernameEditDisabled: true,
      passwordEditDisabled: true,
      passwordRegex:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    };
  },

  components: {
    SetStatus,
  },

  computed: {
    openAccountSettings: {
      get() {
        return this.$store.state.userSavedData.openAccountSettings;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/openCloseAccountSettings", val);
      },
    },

    username: {
      get() {
        return this.$store.state.userSavedData.username;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/setUsername", val);
      },
    },

    isValidPassword(): boolean {
      if (this.passwordEditDisabled) {
        return true;
      }
      return this.passwordRegex.test(this.inputPassword);
    },

    isValidUsername(): boolean {
      if (this.usernameEditDisabled) {
        return true;
      }
      return this.inputUsername.length > 0;
    },
  },

  methods: {
    triggerUsernameEdit() {
      this.usernameEditDisabled = !this.usernameEditDisabled;
      this.inputUsername = "";
    },

    resetUsernameEdit() {
      this.usernameEditDisabled = true;
      this.inputUsername = "";
    },

    triggerPasswordEdit() {
      this.passwordEditDisabled = !this.passwordEditDisabled;
      this.inputPassword = "";
    },

    resetPasswordEdit() {
      this.passwordEditDisabled = true;
      this.inputPassword = "";
    },

    savePassword() {
      if (this.isValidPassword) {
        // store new password
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Invalid password",
        });
      }
    },

    saveUsername() {
      if (this.isValidUsername) {
        this.username = this.inputUsername;
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Username required",
        });
      }
    },
  },
});
</script>

<template>
  <q-dialog
    v-model="signInPopup"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card>
      <q-form
        class="absolute-center"
      >
        <div>
          <q-input
            class="q-mb-md"
            name="Username"
            rounded
            standout
            label="Username"
            hint="Enter your username"
            :error="!isValidUsername"
            error-message="Username is required"
            v-model="inputUsername"
            no-error-icon
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>
        <div>
          <q-input
            class="q-mb-md"
            name="Password"
            rounded
            standout
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="inputPassword"
            hint="Enter your password"
            :error="!isValidPassword"
            error-message="Password is required"
            no-error-icon
          >
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn
            class="q-mb-md centered"
            style="width: 75%"
            label="Sign-In"
            rounded
            @click="signIn"
            :disable="!isValidPassword || !isValidUsername"
          />
        </div>
        <div>
          <q-btn
            class="centered"
            style="width: 75%"
            label="Create Account"
            rounded
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignInDialog",

  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      showPassword: false,
      // passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
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

    signInPopup(): boolean {
      return this.$store.getters['userSavedData/signInPopup']
    },

    isValidPassword(): boolean {
      return this.inputPassword.length > 0
    },

    isValidUsername(): boolean {
      return this.inputUsername.length > 0
    }
  },

  methods: {
    signIn() {
      this.signedIn = !this.signedIn
    }
  }
})
</script>

<style>
.centered {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style>

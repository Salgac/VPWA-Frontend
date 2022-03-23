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
        <div v-if="openAccountCreation">
          <q-btn
            class="q-mb-md"
            icon="arrow_back"
            rounded
            @click="openAccountCreation = !openAccountCreation"
          />
        </div>
        <div v-if="openAccountCreation">
          <q-input
            class="q-mb-md"
            name="Name"
            rounded
            standout
            label="Name"
            hint="Enter your name"
            :error="!isValidName"
            error-message="Name is required"
            v-model="inputName"
            no-error-icon
          >
            <template v-slot:prepend>
              <q-icon name="face" />
            </template>
          </q-input>
        </div>
        <div v-if="openAccountCreation">
          <q-input
            class="q-mb-md"
            name="E-mail"
            rounded
            standout
            label="E-mail"
            hint="Enter your e-mail"
            :error="!isValidEmail"
            error-message="E-mail is required"
            v-model="inputEmail"
            no-error-icon
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
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
        <div v-if="!openAccountCreation">
          <q-btn
            class="q-mb-md centered"
            style="width: 75%"
            label="Sign-In"
            rounded
            @click="signIn(); clearFields()"
            :disable="!isValidPassword || !isValidUsername"
          />
        </div>
        <div v-if="!openAccountCreation">
          <q-btn
            class="centered"
            style="width: 75%"
            label="Create Account"
            rounded
            @click="openRegistration(); clearFields()"
          />
        </div>
        <div v-if="openAccountCreation">
          <q-btn
            class="centered"
            style="width: 75%"
            label="Register"
            rounded
            @click="register(); clearFields()"
            :disable="!isValidPassword || !isValidUsername || !isValidEmail || !isValidName"
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
      inputName: "",
      inputEmail: "",
      inputUsername: "",
      inputPassword: "",
      showPassword: false,
      openAccountCreation: false,
      passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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

    isValidName(): boolean {
      return this.inputName.length > 0
    },

    isValidEmail(): boolean {
      return this.emailRegex.test(this.inputEmail)
    },

    isValidPassword(): boolean {
      if (this.openAccountCreation) {
        return this.passwordRegex.test(this.inputPassword)
      }
      return this.inputPassword.length > 0
    },

    isValidUsername(): boolean {
      return this.inputUsername.length > 0
    }
  },

  methods: {
    signIn() {
      this.signedIn = !this.signedIn
    },

    register() {
      this.openAccountCreation = !this.openAccountCreation
      this.signedIn = !this.signedIn
    },

    openRegistration() {
      this.openAccountCreation = !this.openAccountCreation
      this.showPassword = false
    },

    clearFields() {
      this.inputName = ""
      this.inputEmail = ""
      this.inputUsername = ""
      this.inputPassword = ""
      this.showPassword = false
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

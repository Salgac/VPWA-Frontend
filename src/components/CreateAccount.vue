<template>
  <q-dialog
    v-model="openDialog"
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
        <div>
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
        <div>
        </div>
        <div>
          <q-btn
            class="centered"
            style="width: 75%"
            label="Create Account"
            rounded

            @click="createAccount"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateAccount",

  props: {
    openDialog: {
      type: Boolean,
      //required: true
    }
  },

  data() {
    return {
      inputName: "",
      inputEmail: "",
      inputUsername: "",
      inputPassword: "",
      showPassword: false,
      passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      valueData: this.value
    }
  },

  computed: {
    isValidName(): boolean {
      return this.inputName.length > 0
    },

    isValidEmail(): boolean {
      return this.emailRegex.test(this.inputEmail)
    },

    isValidPassword(): boolean {
      return this.passwordRegex.test(this.inputPassword)
    },

    isValidUsername(): boolean {
      return this.inputUsername.length > 0
    }
  },

  methods: {
    createAccount() {

    }
  }
})
</script>

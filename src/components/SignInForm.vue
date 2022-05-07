<template>
  <q-dialog
    v-model="signInPopup"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card>
      <q-form class="absolute-center">
        <div v-if="openAccountCreation">
          <q-item>
            <q-btn
              class="q-mb-md"
              icon="arrow_back"
              rounded
              @click="
                (openAccountCreation = !openAccountCreation), clearFields()
              "
            />
            <q-space></q-space>
            <q-btn
              v-if="!isValidPassword"
              class="q-mb-md"
              icon="help"
              color="red-5"
              flat
              rounded
              @click="showHint = !showHint"
            />
          </q-item>
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
            error-message="Password required"
            no-error-icon
          >
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
                class="cursor-pointer"
              />
            </template>
            <q-tooltip
              v-if="openAccountCreation"
              v-model="showHint"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              Min. 8 characters<br />
              At least 1 uppercase letter<br />
              At least lowercase letter<br />
              At least 1 number<br />
              At least 1 special character
            </q-tooltip>
          </q-input>
        </div>
        <div v-if="!openAccountCreation">
          <q-btn
            class="q-mb-md centered"
            style="width: 75%"
            label="Sign-In"
            rounded
            @click="
              signIn();
              clearFields();
            "
            :disable="!isValidPassword || !isValidUsername"
          />
        </div>
        <div v-if="!openAccountCreation">
          <q-btn
            class="centered"
            style="width: 75%"
            label="Create Account"
            rounded
            @click="
              openRegistration();
              clearFields();
            "
          />
        </div>
        <div v-if="openAccountCreation">
          <q-btn
            class="centered"
            style="width: 75%"
            label="Register"
            rounded
            @click="
              register();
              clearFields();
            "
            :disable="
              !isValidPassword ||
              !isValidUsername ||
              !isValidEmail ||
              !isValidName
            "
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HttpRequest from "src/services/request";
import { socket } from "src/boot/ws";

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
      showHint: false,
      passwordRegex:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn;
      },
      set(val: boolean) {
        this.$store.commit("userSavedData/signInOut", val);
      },
    },

    signInPopup(): boolean {
      return this.$store.getters["userSavedData/signInPopup"];
    },

    isValidName(): boolean {
      return this.inputName.length > 0;
    },

    isValidEmail(): boolean {
      return this.emailRegex.test(this.inputEmail);
    },

    isValidPassword(): boolean {
      if (this.openAccountCreation) {
        return this.passwordRegex.test(this.inputPassword);
      }
      return this.inputPassword.length > 0;
    },

    isValidUsername(): boolean {
      return this.inputUsername.length > 0;
    },

    userStatus: {
      get() {
        return this.$store.state.userSavedData.userStatus;
      },
      set(val: string) {
        this.$store.commit("userSavedData/setUserStatus", val);
      },
    },

    username: {
      get() {
        return this.$store.state.userSavedData.username;
      },
      set(val: string) {
        this.$store.commit("userSavedData/setUsername", val);
      },
    },

    email: {
      get() {
        return this.$store.state.userSavedData.email;
      },
      set(val: string) {
        this.$store.commit("userSavedData/setEmail", val);
      },
    },

    token: {
      get() {},
      set(val: string) {
        this.$store.commit("userSavedData/setToken", val);
      },
    },
  },

  methods: {
    async signIn() {
      //send api call
      const response = await HttpRequest.post("login", {
        username: this.inputUsername,
        password: this.inputPassword,
      });

      //test for errors
      if (response.hasOwnProperty("errors")) {
        switch (response.errors[0].message) {
          case "E_INVALID_AUTH_UID: User not found":
          case "E_INVALID_AUTH_PASSWORD: Password mis-match":
            //TODO maybe change this into component
            alert("Invalid username or password!");
        }
      } else {
        this.setLogin(response);
      }
    },

    async register() {
      //send api call
      const response = await HttpRequest.post("register", {
        username: this.inputUsername,
        name: this.inputName,
        surname: "", //?
        email: this.inputEmail,
        password: this.inputPassword,
      });

      //test for errors
      if (response.hasOwnProperty("errors")) {
        //TODO
      } else {
        this.openAccountCreation = !this.openAccountCreation;
        this.setLogin(response);
      }
    },

    setLogin(response: any) {
      this.signedIn = !this.signedIn;
      this.userStatus = "online";
      this.username = response.user.username;
      this.email = response.user.email;
      this.token = response.token.token;

      //connect user
      socket.emit("connectUser", {
        token: this.$store.state.userSavedData.token,
        status: this.userStatus,
      });

      //get channel data
      this.$store.dispatch("channelSavedData/loadChannels");
    },

    openRegistration() {
      this.openAccountCreation = !this.openAccountCreation;
      this.showPassword = false;
    },

    clearFields() {
      this.inputName = "";
      this.inputEmail = "";
      this.inputUsername = "";
      this.inputPassword = "";
      this.showPassword = false;
      this.showHint = false;
    },
  },
});
</script>

<style>
.centered {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>

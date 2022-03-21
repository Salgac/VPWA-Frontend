<template>
  <div>
    <q-form class="q-mx-md q-mt-xl">
      <q-input
        class="q-mb-md"
        name="Username"
        clearable
        rounded
        standout
        label="Enter your username"
        v-model="inputUsername"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        class="q-mb-md"
        name="Password"
        clearable
        rounded
        standout
        :type="showPassword ? 'text' : 'password'"
        label="Enter your password"
        v-model="inputPassword"
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
      <q-btn
        label="Sign-In"
        rounded
        @click="signedIn = !signedIn"
      />
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignInDialog",

  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      showPassword: false
    }
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
})
</script>

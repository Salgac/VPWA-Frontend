<template>
  <div>
    <q-dialog v-model="signInPopup" persistent>
      <q-card>
        <q-form>
          <q-input
            class="q-mt-md q-mb-md q-mx-md"
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
            class="q-mb-md q-mx-md"
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
          <div>
          <q-btn
            class="q-mb-md q-ml-md horizontal-element"
            label="Sign-In"
            rounded
            @click="signedIn = !signedIn"
          />
          <q-btn
            class="q-mb-md q-ml-md horizontal-element"
            label="Create Account"
            rounded
          />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
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
    },

    signInPopup() {
      return this.$store.getters['userSavedData/signInPopup']
    }
  },
})
</script>

<style>
.horizontal-element {
  display: inline-block;
}
</style>

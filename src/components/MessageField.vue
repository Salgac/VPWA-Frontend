<template>
  <div
    class="q-mr-sm" style="width: 100%"
  >
    <q-infinite-scroll @load="onLoad" reverse>
      <template v-slot:loading>
        <div class="q-my-md absolute-center">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div class="q-pa-md row justify-center">
        <div style="width: 100%">
          <q-chat-message v-if="signedIn"
            v-for="(item, index) in messages"
            :key="index"
            :name="item.author"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :text="[item.text]"
            :sent="item.author == 'You' ? true : false"
            :stamp="item.time"
          />
        </div>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageField",

  data() {
    return {
      messages: [
        { author: "You", time: "12:43", text: "Hello world!" },
        { author: "Testy", time: "12:44", text: "I like turtles" },
      ],
    };
  },

  methods: {
    onLoad(/*index, done*/) {
      //TODO implement this
      //done();
    },
  },

  computed: {
    signedIn: {
      get() {
        return this.$store.state.userSavedData.signedIn
      },
      set(val: boolean) {
        this.$store.commit('userSavedData/signInOut', val)
      }
    }
  },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <MessageField />
  </q-page>
</template>

<script lang="ts">
import MessageField from "src/components/chat/MessageField.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: { MessageField },
  data() {
    return {};
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
});
</script>

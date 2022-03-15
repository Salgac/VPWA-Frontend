<template>
  <q-page class="row items-center justify-evenly">
    <MessageField />
  </q-page>
</template>

<script lang="ts">
import MessageField from "components/MessageField.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: { MessageField },
  data() {
    return {};
  },
});
</script>

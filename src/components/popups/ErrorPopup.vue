<template />

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    notify(message: string, err: boolean) {
      this.$q.notify({
        color: err ? "red-5" : "green-4",
        textColor: "white",
        icon: err ? "warning" : "cloud_done",
        message: message,
      });
    },
  },
  watch: {
    "$store.state.commandSavedData.commandMessage": function (val) {
      //display last error message
      if (val != "") {
        this.notify(val, true);
        this.$store.commit("commandSavedData/setMessage", "");
      }
    },
  },
});
</script>

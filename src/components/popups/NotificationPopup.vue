<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppVisibility } from "quasar";

export default defineComponent({
  name: "NotificationPopup",
  data(){
    return {
      loading: null as any,
      audio: new Audio("https://www.dropbox.com/s/qf7a9y1r82pfhlq/notification.mp3?dl=1"),
    }
  },  
  methods: {
    getPFP(author: string) {
      return `https://avatars.dicebear.com/api/bottts/${author}.svg`;
    },
    errorNotification(message: string, err: boolean) {
      this.$q.notify({
        color: err ? "red-5" : "green-4",
        textColor: "white",
        icon: err ? "warning" : "cloud_done",
        message: message,
      });
    },
    messageNotification(message:string, user:string, channel:string){
      //notify if visible, else play sound
      if(!AppVisibility.appVisible){
        this.audio.play();
        return;
      }

      const text = message.length > 30 ? message.substring(0,30) + "..." : message;
      this.$q.notify({
        color: "white",
        textColor: "black",
        message: `<strong>${channel}:</strong> ${text}`,
        caption: `<strong>User:</strong> <em>${user}</em>`,
        avatar: this.getPFP(user),
        html: true,
        position: 'top',
        actions: [
          {
            label: 'View',color:'black', handler: () => {
              this.$store.commit('channelSavedData/setCurrentChannel', channel);
            }
          }
        ]
      });
    },
    loadingNotification(){
      this.loading = this.$q.notify({
        spinner: true,
        message: 'Loading...',
        position: 'bottom',
        timeout: 0,
      });
    }
  },
  watch: {
    "$store.state.commandSavedData.commandMessage": function (val) {
      //display last error message
      if (val != "") {
        this.errorNotification(val, true);
        this.$store.commit("commandSavedData/setMessage", "");
      }
    },
    "$store.state.commandSavedData.notification": function (val: any) {
      //display last notification
      if ( val != null && this.$store.state.userSavedData.signedIn && !this.$store.state.commandSavedData.loading) {
        this.messageNotification(val.text, val.author, val.channelName );
        this.$store.commit("commandSavedData/setNotification", null);
      }
    },
    "$store.state.commandSavedData.loading": function (val) {
      //display spinner
      if (val == true) {
        this.loadingNotification();
      } else{
        this.loading();
        this.loading = null;
      }
    },
  },
});
</script>

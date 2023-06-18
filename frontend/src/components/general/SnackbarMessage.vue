<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn :color="color" variant="text" @click="snackbar = false"> Chiudi </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  export default {
    name: "SnackbarMessage",
    data: () => ({
      snackbar: false,
      text: "--",
      color: "green",
      type: "info", //info, warning, error
      timeout: 2500,
    }),
    methods: {
      open(text, type) {
        this.text = text;
        this.type = type;
        if (!type || type === "info" || type === "") this.color = "green";
        if (type === "warning" || type === "") this.color = "yellow";
        if (type === "error" || type === "") this.color = "red";
        this.snackbar = true;
      },
    },
  };
</script>

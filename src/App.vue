<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
<style lang="scss">
body {
  height: 100%;
  overflow-y: hidden !important;
  margin: 0;
  padding-bottom: 0 !important;
}
.scroll-content {
  padding-bottom: 0 !important;
}
</style>

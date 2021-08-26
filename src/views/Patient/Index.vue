<template>
  <section>
    <navbar></navbar>
    <router-view></router-view>
  </section>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>Navbar
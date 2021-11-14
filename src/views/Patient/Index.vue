<template>
  <section>
    <navbar></navbar>
    <v-alert type="warning" class="ma-1" outlined v-if="!user.verified"
      >Please Verify Your Account to Place an Appointment

      <router-link to="/patient/verify" style="color: red"
        >Verify Here</router-link
      >
    </v-alert>
    <router-view></router-view>
  </section>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  computed: {
    user() {
      return this.$store.getters["authentication/user"];
    },
  },
};
</script>Navbar
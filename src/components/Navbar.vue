<template>
  <section>
    <v-app-bar color="primary" dark   app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar
            color="primary"
            v-if="user.photo.trim().length == 0"
            class="white--text"
          >
            {{
              user.first_name.substring(0, 1) + user.last_name.substring(0, 1)
            }}</v-avatar
          >
          <v-img :src="user.photo" v-else></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ user.first_name + " " + user.last_name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link color="primary" to="/patient/book">
            <v-list-item-icon>
              <v-icon color="primary">mdi-tooth</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Book Appointment</v-list-item-title>
          </v-list-item>

          <v-list-item link color="primary" to="/patient/appointment">
            <v-list-item-icon>
              <v-icon color="primary">mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Appointment</v-list-item-title>
          </v-list-item>

          <v-list-item link color="primary" to="/patient/profile">
            <v-list-item-icon>
              <v-icon color="primary">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item>
          <v-list-item link color="primary" @click="logout">
            <v-list-item-icon>
              <v-icon color="primary">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    user() {
      return this.$store.getters["authentication/user"];
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("authentication/signOut");
      this.$router.push("/")
    },
  },
};
</script>

<style>
</style>
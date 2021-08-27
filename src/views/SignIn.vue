<template>
  <section>
    <div class="header text-center primary--text mt-15">
      <v-img
        class="mx-auto"
        :src="require('@/assets/login/logo.png')"
        max-height="140"
        max-width="140"
      />
      <h2>Sign In</h2>
    </div>
    <div class="form">
      <v-text-field
        label="Email"
        background-color="#ffff"
        v-model="user.email"
        outlined
        :error-messages="error"
        color="primary"
        rounded
        class="px-5"
      />
      <v-text-field
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
        label="Password"
        background-color="#ffff"
        v-model="user.password"
        outlined
        :error-messages="error"
        color="primary"
        rounded
        class="px-5"
        @keydown.enter="login"
      />
      <div class="px-7">
        <v-btn block color="primary" class="mx-auto" @click="submit"
          >Submit</v-btn
        >
      </div>
    </div>

    <footer class="mt-16">
      <div class="login-label">
        Forgot password?
        <router-link to="/forgotpassword" class="primary--text"
          >Click here</router-link
        >
      </div>
      <div class="login-label">
        Don't have an account yet?
        <router-link to="/sign-up" class="primary--text">Sign Up!</router-link>
      </div>
    </footer>
    <v-dialog v-model="spinner" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Signing In...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
// import { Toast } from "@capacitor/toast";
import { App } from "@capacitor/app";
export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
    showPass: false,
    spinner: false,
    error: null,
  }),
  methods: {
    async submit() {
      this.login();
      // await Toast.show({
      //   text: `Hello! ${this.user.email}`,
      // });
    },

    async login() {
      try {
        this.spinner = true;
        await this.$store.dispatch("authentication/singIn", this.user);
        this.spinner = false;
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.spinner = false;
        console.log(error.message);
        this.error = error.message;
      }
    },
  },
  mounted() {
    App.addListener("backButton", () => {
      alert("Thou shall not back");
    });
  },
  destroyed() {
    App.removeAllListeners();
  },
};
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  min-height: 650px;
  overflow: hidden;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #6300ee49),
    url("~@/assets/login/BG.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 950px 812px;
  display: flex;
  flex-direction: column;
}
.header {
}
.form {
  transform: translateY(20px);
  flex-grow: 1;

  vertical-align: middle;
  width: 100%;
}

footer {
  width: 100%;
  text-align: center;
  .login-label {
    font-weight: 500;
    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
  }
}
</style>

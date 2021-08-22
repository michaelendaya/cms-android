<template>
  <section>
    <!-- <v-card elevation="12" class="login-card" width="80vw"> -->
    <div class="loginform">
      <v-img
        class="mx-auto"
        :src="require('@/assets/login/logo.png')"
        max-height="140"
        max-width="140"
      />
      <div class="text-center mb-10 mx-n5">
        <v-text-field
          label="First Name"
          background-color="#ffff"
          v-model="username"
          outlined
          :error-messages="error"
          color="primary"
          class="px-15"
        />
        <v-text-field
          label="Email"
          background-color="#ffff"
          v-model="username"
          outlined
          :error-messages="error"
          color="primary"
          class="px-15"
        />
        <v-text-field
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
          label="Password"
          background-color="#ffff"
          v-model="password"
          outlined
          :error-messages="error"
          color="primary"
          class="px-15"
          @keydown.enter="login"
        />
        <v-btn color="primary" class="mt-5" @click="login"> Submit </v-btn>
      </div>
    </div>
    <div class="end">
      <div class="login-label">
        Forgot password?
        <router-link to="/forgotpassword" class="primary--text"
          >Click here</router-link
        >
      </div>
      <div class="login-label">
        Don't have an account yet?
        <router-link to="/signup" class="primary--text">Sign Up!</router-link>
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  background-image: url("~@/assets/login/BG.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  //   .login-card {
  //     border-radius: 50px;
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  .end {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-label {
      margin-bottom: 5px;
      a:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      a {
        text-decoration: none;
      }
    }
  }

  .loginform {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
//}
</style>

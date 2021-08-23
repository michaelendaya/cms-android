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
        v-model="username"
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
        v-model="username"
        outlined
        :error-messages="error"
        color="primary"
        rounded
        class="px-5"
      />
      <div class="px-7">
        <v-btn block color="primary" class="mx-auto ">Submit</v-btn>
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
        <router-link to="/signup" class="primary--text">Sign Up!</router-link>
      </div>
    </footer>
  </section>
</template>

<script>
export default {};
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

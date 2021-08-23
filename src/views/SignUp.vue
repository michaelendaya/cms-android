<template>
  <section>
    <div class="header text-center primary--text mt-15">
      <v-img
        class="mx-auto"
        :src="require('@/assets/login/logo.png')"
        max-height="140"
        max-width="140"
      />
      <h2>Sign Up</h2>
    </div>
    <div class="form mx-auto">
      <!-- FORM STEP -->
      <div v-if="step == 1">
        <v-text-field
          label="First Name"
          background-color="#ffff"
          outlined
          :error-messages="error"
          color="primary"
          rounded
          class="px-5"
        />
        <v-text-field
          label="Last Name"
          background-color="#ffff"
          outlined
          :error-messages="error"
          color="primary"
          rounded
          class="px-5"
        />
        <div class="px-7">
          <v-btn block color="primary" class="mx-auto"  @click="moveStep">Next</v-btn>
        </div>
      </div>

      <div v-if="step == 2">
        <v-text-field
          label="Last Name"
          background-color="#ffff"
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
          outlined
          :error-messages="error"
          color="primary"
          rounded
          class="px-5"
        />
        <div class="px-5">
          <v-btn block color="primary" class="mx-auto px-5" @click="moveStep"
            >Next</v-btn
          >
        </div>
      </div>
    </div>
    <footer class="mt-16">
      <div class="login-label">
        Already have an account?
        <router-link to="/signup" class="primary--text"
          >Sign In instead</router-link
        >
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
  methods: {
    //Move step function 
    moveStep() {
      if (!(this.step == 2)) {
          this.step += 1;
        alert(this.step);
      } else {
        this.step = 1;
      }
    },
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
}
</style>

<template>
  <section>
    <div class="services mx-2">
      <h1 class="mt-7">Verify Your Account</h1>
      <div class="mt-2">
        We have sent you an email containing the code to verify your account. 
      

        <v-alert type="success" class="my-5" outlined v-if="emailSent"
          >Verification Code Sent
        </v-alert>
        <v-row class="">
          <v-col cols="12">
            <v-text-field
              label="Verification Code"
              v-model="code"
              outlined
              :error-messages="error"
              color="primary"
            />
          </v-col>
          <v-col cols="12" class="mt-n5">
            <div class="d-flex">
              <v-btn
                class="mx-auto"
                color="primary"
               @click="sendEmail"
                outlined
                >Send Code</v-btn
              >
              <v-btn class="mx-auto" color="primary" @click="activateAccount"
                >Activate Account</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    emailSent: false,
    code: "",
    error: "",
  }),
  computed: {
    email() {
      return this.$store.getters["authentication/user"].email;
    },
  },
  methods: {
    async sendEmail() {
      const data = {
        email: this.email,
      };
      const response = await this.$http.post(`verifyemail`, data);
      console.log(response);
      this.emailSent = true;
    },
    async activateAccount() {
      try {
        const response = await this.$http.put(`verify/${this.code}`);
        this.$store.commit("authentication/SET_USER", response.data.user);
        this.$router.push("/patient/home");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.send {
  color: #6200ee;
  cursor: pointer;
}
</style>
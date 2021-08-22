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

      <div class="text-center mb-10 mx-n5" v-show="step == 1">
        <div class="mb-5 primary--text">What's your name?</div>
        <v-text-field
          label="First Name"
          rounded
          background-color="#ffff"
          v-model="username"
          outlined
          color="primary"
        />
        <v-text-field
          label="Last Name"
          background-color="#ffff"
          rounded
          outlined
          color="primary"
        />
        <v-btn
          color="primary"
          class="mt-5"
          @click="step = 2"
          max-width="90vw"
          block
          rounded
        >
          Next
        </v-btn>
      </div>
      <div class="text-center mb-10 mx-n5" v-show="step == 2">
        <div class="mb-5 primary--text">What's your address?</div>

        <v-select
          rounded
          background-color="#ffff"
          v-model="selectedProvince"
          outlined
          :items="province"
          required
          label="Province"
        ></v-select>
        <v-select
          rounded
          background-color="#ffff"
          v-model="selectedMunicipalities"
          outlined
          :items="municipalities"
          label="Municipality"
        >
          <template slot="no-data"> Fill out municipality first </template>
        </v-select>
                  <v-text-field
            label="Brgy, Street, Lot no."
                rounded
          background-color="#ffff"
       outlined
            required
   
            color="primary"
            v-model="streetAddress"
          />
        <v-btn
          color="primary"
          class="mt-5 mx-5"
          @click="step = 1"
          max-width="90vw"
          rounded
          outlined
          width="100"
        >
          Back
        </v-btn>
        <v-btn
          color="primary"
          class="mt-5 mx-5"
          @click="step = 1"
          max-width="90vw"
          rounded
          width="100"
        >
          Next
        </v-btn>
      </div>
    </div>
    <div class="end">
      <div class="login-label">
        Already Have an Account?
        <router-link to="/login" class="primary--text">Sign In</router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { provinces } from "psgc";
export default {
  data: () => ({
    step: 1,
    province: [],
    selectedProvince: "",
    municipalities: [],
    selectedMunicipalities: "",
    streetAddress:""
  }),
  watch: {
    selectedProvince(v) {
      this.municipalities = provinces.find(v).municipalities.map((a) => a.name);
    },
  },
  mounted() {
    this.province = provinces.all().map((a) => a.name);
  },
};
</script>

<style lang="scss" scoped>
//animation

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
  border: 1px solid green;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
section {
  height: 100vh;

  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #6300ee49),
    url("~@/assets/login/BG.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .loginform {
    width: 80%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
}
//}
</style>

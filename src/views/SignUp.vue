<template>
  <section>
    <div class="header text-center primary--text mt-15">
      <v-img
        class="mx-auto"
        :src="require('@/assets/login/logo.png')"
        max-height="140"
        max-width="140"
      />
    </div>

    <div class="form mx-auto">
      <!-- FORM STEP -->

      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form ref="form1">
            <v-text-field
              label="Email"
              background-color="#ffff"
              :rules="[rules.required, rules.email]"
              v-model="user.email"
              outlined
              :error-messages="error"
              color="primary"
              rounded
              class="px-5 mt-2"
            />
            <v-text-field
              label="Password"
              background-color="#ffff"
              :rules="[rules.required, rules.min]"
              :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass1 ? 'text' : 'password'"
              required
              @click:append="showPass1 = !showPass1"
              v-model="user.pass"
              outlined
              :error-messages="error"
              color="primary"
              rounded
              class="px-5"
            />
            <v-text-field
              label="Confirm Password"
              background-color="#ffff"
              required
              :rules="[rules.required, rules.passMatch]"
              :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass2 ? 'text' : 'password'"
              @click:append="showPass2 = !showPass2"
              v-model="cpass"
              outlined
              :error-messages="error"
              color="primary"
              rounded
              class="px-5"
            />
          </v-form>
        </v-window-item>

        <v-window-item :value="2">
          <v-form ref="form2">
            <v-text-field
              label="First Name"
              background-color="#ffff"
              outlined
              :rules="[rules.required]"
              :error-messages="error"
              v-model="user.firstname"
              color="primary"
              rounded
              class="px-5 mt-2"
            />
            <v-text-field
              label="Last Name"
              background-color="#ffff"
              outlined
              :rules="[rules.required]"
              :error-messages="error"
              v-model="user.lastname"
              color="primary"
              rounded
              class="px-5"
            />
            <v-text-field
              label="Middle Name"
              background-color="#ffff"
              outlined
              :rules="[rules.required]"
              :error-messages="error"
              v-model="user.middlename"
              color="primary"
              rounded
              class="px-5"
            />
          </v-form>
        </v-window-item>

        <v-window-item :value="3">
          <v-form ref="form3">
            <v-select
              background-color="#ffff"
              color="primary"
              class="px-5 mt-2"
              rounded
              :rules="[rules.required]"
              v-model="selectedProvince"
              outlined
              :items="province"
              required
              label="Province"
            ></v-select>
            <v-select
              background-color="#ffff"
              color="primary"
              class="px-5"
              rounded
              :rules="[rules.required]"
              v-model="selectedMunicipalities"
              outlined
              :items="municipalities"
              label="Municipality"
            >
              <template slot="no-data"> Fill out municipality first </template>
            </v-select>
            <v-text-field
              label="Brgy, Street, Lot no."
              background-color="#ffff"
              :rules="[rules.required]"
              v-model="user.address"
              outlined
              :error-messages="error"
              color="primary"
              rounded
              class="px-5"
            />
          </v-form>
        </v-window-item>

        <v-window-item :value="4">
          <v-form ref="form4">
            <v-text-field
              label="Phone number"
              background-color="#ffff"
              outlined
              :rules="[rules.required, rules.phone]"
              :error-messages="error"
              v-model="user.phoneNumber"
              color="primary"
              rounded
              class="px-5 mt-2"
            />
            <v-select
              v-model="user.gender"
              :rules="[rules.required]"
              :error-messages="error"
              :items="genderList"
              label="Gender"
              color="primary"
              rounded
              class="px-5"
              background-color="#ffff"
              outlined
            ></v-select>
            <v-menu
              v-model="user.showBday"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  :rules="[rules.required]"
                  rounded
                  class="px-5"
                  background-color="#ffff"
                  v-model="user.bday"
                  label="Birthdate"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="user.bday"
                @input="showBday = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-window-item>
      </v-window>

      <v-card-actions class="mx-5">
        <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="step++" v-if="step < 4">
          Next
        </v-btn>

        <v-btn color="primary" depressed @click="submit" v-else> Submit </v-btn>
      </v-card-actions>
    </div>

    <footer class="mt-16">
      <div class="login-label">
        Already have an account?
        <router-link to="/" class="primary--text">Sign In instead</router-link>
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
import { App } from "@capacitor/app";
import { provinces } from "psgc";
export default {
  data() {
    return {
      step: 1,
      showBday: false,
      spinner: false,
      user: {
        firstname: "",
        lastname: "",
        middlename: "",
        address: "",
        email: "",
        pass: "",
        phoneNumber: null,
        gender: null,
        bday: null,
      },
      selectedProvince: "",
      selectedMunicipalities: "",
      province: [],
      municipalities: [],
      cpass: "",
      showPass1: false,
      showPass2: false,
      genderList: ["male", "female"],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        passMatch: (v) =>
          v === this.user.pass || "The password you entered don't match",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const pattern = /^(09|\+639)\d{9}$/;
          return (
            pattern.test(value) ||
            "Phone number should be 09xxxxxxxxx or +639xxxxxxxxx"
          );
        },
      },
      error: null,
    };
  },

  watch: {
    selectedProvince(v) {
      console.log("A");
      this.municipalities = provinces.find(v).municipalities.map((a) => a.name);
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Full name";
        case 3:
          return "Address";
        default:
          return "Basic Info";
      }
    },
  },
  methods: {
    submit() {
      if (!this.$refs.form1.validate()) {
        this.step = 1;
      } else if (!this.$refs.form2.validate()) {
        this.step = 2;
      } else if (!this.$refs.form3.validate()) {
        this.step = 3;
      } else if (!this.$refs.form4.validate()) {
        this.step = 4;
      } else {
        this.signUp();
      }
    },
    async signUp() {
      const data = {
        first_name: this.user.firstname,
        middle_name: this.user.middlename,
        last_name: this.user.lastname,
        birth_date: this.user.bday,
        gender: this.user.gender,
        home_address: `${this.selectedProvince}, ${this.selectedMunicipalities} , ${this.user.address}`,
        contact_number: this.user.phoneNumber,
        email: this.user.email,
        password: this.user.pass,
      };
      console.log(data);
      try {
        this.spinner = true;
        let x = await this.$store.dispatch("authentication/signUp", data);
        this.spinner = false;
        if (x == "success") {
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        this.spinner = false;
        this.error = error.message;
        this.step = 1;
      }
    },
  },
  mounted() {
    this.province = provinces.all().map((a) => a.name);
    App.addListener("backButton", () => {
        this.$router.back()
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

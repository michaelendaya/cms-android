<template>
  <section class="mb-13 mt-10 mx-auto">
    <div class="px-3">
      <v-card-title>
        <v-hover
          v-if="photo.trim().length == 0 && selectedFile == null"
          v-slot="{ hover }"
        >
          <v-avatar
            color="primary"
            class="white--text mx-auto"
            size="100"
            @click="sheet = true"
          >
            {{ firstname.substring(0, 1) + lastname.substring(0, 1) }}
            <div class="thumb">
              <v-btn :class="{ 'show-btns': hover }" icon large>
                <v-icon :class="{ 'show-btns': hover }" large>
                  mdi-image
                </v-icon>
              </v-btn>
            </div>
          </v-avatar>
        </v-hover>
        <v-hover v-slot="{ hover }" v-else>
          <v-img
            :src="photo"
            aspect-ratio="1"
            max-height="100"
            max-width="100"
            class="rounded-circle mx-auto"
            @click="sheet = true"
          >
            <div class="thumb">
              <v-btn :class="{ 'show-btns': hover }" icon large>
                <v-icon :class="{ 'show-btns': hover }" large>
                  mdi-image
                </v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-hover>

        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          hidden
          @change="onFileSelected"
        />
        <input
          type="file"
          id="takePhoto"
          accept="image/*"
          hidden
          capture
          @change="onFileSelected"
        />
      </v-card-title>

      <div class="px-5">
        <v-form ref="form1">
          <div class="border">
            <v-row>
              <v-col cols="10">
                Full Name
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="editBro(0)">
                  <v-icon>{{
                    readOnly == true ? "mdi-pencil" : "mdi-pencil-off"
                  }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                required
                :rules="[rules.required]"
                label="Firstname"
                outlined
                color="primary"
                :readonly="readOnly"
                v-model="firstname"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                required
                :rules="[rules.required]"
                label="Lastname"
                outlined
                color="primary"
                :readonly="readOnly"
                v-model="lastname"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                required
                :rules="[rules.required]"
                label="Middle Name"
                outlined
                color="primary"
                :readonly="readOnly"
                v-model="middlename"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-form ref="form2">
          <div class="border">
            <v-row>
              <v-col cols="10">
                Address
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="editBro(1)">
                  <v-icon>{{
                    readOnly1 == true ? "mdi-pencil" : "mdi-pencil-off"
                  }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                :rules="[rules.required]"
                v-model="selectedProvince"
                outlined
                :items="province"
                :readonly="readOnly1"
                required
                label="Province"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :item-value="selectedMunicipalities"
                :rules="[rules.required]"
                :readonly="readOnly1"
                v-model="selectedMunicipalities"
                outlined
                :items="municipalities"
                label="Municipality"
              >
                <template slot="no-data">
                  Fill out municipality first
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                label="Brgy, Street, Lot no."
                outlined
                required
                :rules="[rules.required]"
                color="primary"
                v-model="address"
                :readonly="readOnly1"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-form ref="form3">
          <div class="border">
            <v-row>
              <v-col cols="10">
                Phone Number
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="editBro(2)">
                  <v-icon>{{
                    readOnly2 == true ? "mdi-pencil" : "mdi-pencil-off"
                  }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

            <v-text-field
              label="Phone number"
              :rules="[rules.required, rules.phone]"
              required
              outlined
              color="primary"
              v-model="phoneNumber"
              :readonly="readOnly2"
            />
        </v-form>

        <v-form ref="form4">
          <div class="border">
            <v-row>
              <v-col cols="10">
                Password
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="editBro(3)">
                  <v-icon>{{
                    readOnly3 == true ? "mdi-pencil" : "mdi-pencil-off"
                  }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

            <v-row>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  v-model="pass"
                  :rules="!readOnly3 ? [rules.required, rules.passMatch] : []"
                  required
                  :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass1 ? 'text' : 'password'"
                  @click:append="showPass1 = !showPass1"
                  label="Password"
                  outlined
                  color="primary"
                  :readonly="readOnly3"
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  :rules="!readOnly3 ? [rules.required, rules.passMatch] : []"
                  required
                  v-model="cpass"
                  :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass2 ? 'text' : 'password'"
                  @click:append="showPass2 = !showPass2"
                  label="Confirm Password"
                  outlined
                  color="primary"
                  :readonly="readOnly3"
                />
              </v-col>
            </v-row>

        </v-form>

        <v-btn
          :disabled="
            readOnly && readOnly1 && readOnly2 && readOnly3 && !selectedFile
          "
          color="primary"
          class="mt-5"
          block
          @click="validate"
        >
          SAVE
        </v-btn>
      </div>
    </div>
    <!-- buttom sheet -->
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <!-- <v-list-item v-for="tile in 5" :key="tile.title" @click="sheet = false">
          <v-list-item-avatar>
            {{ tile }}
          </v-list-item-avatar> -->
        <v-list-item
          @click="
            sheet = false;
            chooseFiles();
          "
        >
          <v-list-item-avatar>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Upload Photo</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            sheet = false;
            takePhoto();
          "
        >
          <v-list-item-avatar>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Take Photo</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-dialog v-model="spinner" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Updating Profile
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
import { provinces } from "psgc";
export default {
  data() {
    return {
      spinner: false,
      sheet: false,
      selectedFile: null,
      fileName: "",
      image: "",
      readOnly: true,
      readOnly1: true,
      readOnly2: true,
      readOnly3: true,
      photo: "",
      firstname: "",
      lastname: "",
      middlename: "",
      address: "",
      province: [],
      selectedProvince: "",
      municipalities: [],
      selectedMunicipalities: "",
      phoneNumber: "",
      cpass: "",
      pass: "",
      showPass1: false,
      showPass2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        passMatch: () =>
          this.pass === this.cpass || `The password you entered don't match`,
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  methods: {
    validate() {
      if (this.$refs.form1.validate() && !this.readOnly) {
        this.editProfile();
      } else if (this.$refs.form2.validate() && !this.readOnly1) {
        this.editProfile();
      } else if (this.$refs.form3.validate() && !this.readOnly2) {
        this.editProfile();
      } else if (this.$refs.form4.validate() && !this.readOnly3) {
        this.editProfile();
      } else if (this.selectedFile != null) {
        this.editProfile();
      } else {
        return;
      }
    },
    chooseFiles() {
      document.getElementById("fileUpload").click();
      console.log("a");
    },
    takePhoto() {
      document.getElementById("takePhoto").click();
      console.log("ab");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];

      console.log(this.selectedFile);

      this.fileName = event.target.files[0].name;
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
      this.photo = this.image;
    },
    async editProfile() {
      const photo = this.selectedFile;
      let data = new FormData();
      data.append("first_name", this.firstname);
      data.append("middle_name", this.middlename);
      data.append("last_name", this.lastname);
      data.append(
        "home_address",
        `${this.address},${this.selectedMunicipalities},${this.selectedProvince}`
      );
      data.append("contact_number", this.phoneNumber);
      data.append("email", this.email);
      data.append("password", this.pass);
      if (photo) {
        data.append("photo", this.selectedFile, this.selectedFile.name);
      }
      console.log(data);
      try {
        this.spinner = true;
        await this.$store.dispatch("authentication/editProfile", data);
        this.$router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    },
    editBro(x) {
      if (x == 0) {
        this.readOnly = !this.readOnly;
      } else if (x == 1) {
        this.readOnly1 = !this.readOnly1;
      } else if (x == 2) {
        this.readOnly2 = !this.readOnly2;
      } else if (x == 3) {
        this.readOnly3 = !this.readOnly3;
      }
    },
  },
  watch: {
    selectedProvince(v) {
      this.municipalities = provinces.find(v).municipalities.map((a) => a.name);
    },
  },
  computed: {
    user() {
      return this.$store.getters["authentication/user"];
    },
  },
  created() {
    // let user = JSON.parse(localStorage.getItem("user"));
    this.firstname = this.user.first_name;
    this.lastname = this.user.last_name;
    this.middlename = this.user.middle_name;
    this.photo = this.user.photo;
    this.email = this.user.email;
    this.address = this.user.home_address;
    this.phoneNumber = this.user.contact_number;
    this.province = provinces.all().map((a) => a.name);
    let address = this.user.home_address.split(",");
    console.log(address)
    this.selectedProvince = address[address.length - 1];
    this.municipalities = provinces
      .find(this.selectedProvince)
      .municipalities.map((a) => a.name);
    this.selectedMunicipalities = address[address.length - 2].trim();
    address.splice(address.length - 2, 2);
    console.log(address);
    this.address = address;
  },
};
</script>

<style lang="scss" scoped>
.border {
  border-bottom-style: groove;
  margin-top: 10px;
  margin-bottom: 30px;
}
.show-btns {
  color: #fff !important;
}
.thumb {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

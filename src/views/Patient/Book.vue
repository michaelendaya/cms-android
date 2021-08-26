<template>
  <section style="overflow-x: hidden">
    <div class="form-control mt-15 ml-8">
      <v-form ref="form" class="ma-5">
        <v-row>
          <v-col cols="10" sm="5">
            <v-menu
              v-model="showDate"
              :close-on-content-click="false"
              :nudge-right="-20"
              transition="scale-transition"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  required
                  :rules="[rules.required]"
                  v-model="date"
                  label="Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="showDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="10" sm="4">
            <v-menu
              v-model="showTime"
              :close-on-content-click="false"
              :nudge-right="-20"
              transition="scale-transition"
              min-width="auto"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  outlined
                  :value="time"
                  label="Time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="showTime"
                :allowed-hours="allowedHours"
                :allowed-minutes="allowedMinutes"
                :value="time"
                @click:hour="closePicker"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="10" sm="6">
            <v-select
              v-model="service"
              :rules="[rules.required]"
              required
              :items="serviceList"
              label="Type of Appointment"
              color="primary"
              outlined
            ></v-select>
          </v-col>

          <v-dialog v-model="dialog" persistent elevation="12" max-width="300">
            <template v-slot:activator="{ on, attrs }">
              <v-col cols="6" sm="6"
                ><v-btn color="primary" class="mt-2" v-bind="attrs" v-on="on"
                  >Submit</v-btn
                ></v-col
              >
            </template>

            <v-card>
              <v-card-title>
                RULES AND REGULATIONS WITH APPOINTMENTS
              </v-card-title>
              <v-card-text class="rules">
                1) The scheduling of an appointment by the patient is subject to
                the clinic hours of Aguayo Dental Clinic <br />
                2) Before proceeding to the appointment, the patient should make
                sure that the scheduled appointment is accepted by the dentist.
                <br />
                3) Patient should at least be 10 mins before their scheduled
                appointment.<br />
                4) During the schedule appointment visit, Patients should be
                understanding and allow approximately up to 15 mins interval
                between patient.<br />
                5) For cancellation of approved appointments, the patient should
                contact the dentist to clear their appointment and is advised to
                do it a day before. <br />
                6) The dentist may cancel an approved appointment given that the
                dentist has a valid reason such as emergencies, illness, etc.
                <br />
                7) For declined appointments, the patient would be advised to
                reschedule on a later date.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="validate">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-form>
    </div>

    <div class="services mx-8">
      <h1>Services</h1>
      <div class="service-list d-flex flex-wrap ml-n2">
        <v-card
          max-width="300"
          class="ma-5"
          v-for="service in services"
          :key="service.type"
        >
          <v-img
            class="white--text align-end"
            width="490px"
            height="200px"
            :src="service.img"
          >
            <v-card-title>{{ service.type }}</v-card-title>
            <v-card-subtitle class="pb-0">
              ₱{{ service.price }}</v-card-subtitle
            >
            <v-card-text>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
                eum doloremque iste, neque eligendi impedit unde corporis nobis
                magnam provident.
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  data: () => ({
    dialog: false,
    showDate: false,
    date: null,
    showTime: false,
    time: null,
    service: null,
    serviceList: [
      "Consultation",
      "Oral Prophylaxis",
      "Restorative Procedure",
      "Prosthetics",
      "Orthodontics",
      "Extraction/Surgery",
      "Topical Flouride Application/Sealant",
      "Cosmetic Procedure",
    ],
    rules: {
      required: (value) => !!value || "Required.",
    },
    services: [
      {
        type: "Consultation",
        price: "350",
        img: require("@/assets/services/consult.jpg"),
      },
      {
        type: "Oral Prophylaxis",
        price: "950",
        img: require("@/assets/services/oral-prophylaxis.png"),
      },
      {
        type: "Restorative Procedure",
        price: "950",
        img: require("@/assets/services/restorative-procedure.jpg"),
      },
      {
        type: "Prosthetics",
        price: "2000",
        img: require("@/assets/services/prosthetics.jpg"),
      },
      {
        type: "Orthodontics",
        price: "7000-75000",
        img: require("@/assets/services/orthodontics.jpg"),
      },
      {
        type: "Extraction/Surgery",
        price: "950",
        img: require("@/assets/services/extraction.jpg"),
      },
      {
        type: "Topical Flouride Application/Sealant",
        price: "950 - 1500",
        img: require("@/assets/services/topical.jpg"),
      },
      {
        type: "Cosmetic Procedure",
        price: "4000 - 20000",
        img: require("@/assets/services/cosmetic.jpg"),
      },
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.submitHandler();
        this.dialog = false;
      } else {
        return;
      }
    },
    allowedHours: (v) => !(v >= 12 && v <= 12) && v >= 9 && v <= 16,
    allowedMinutes: (v) => v == 0,
    closePicker(v) {
      v = v < 10 ? "0" + v : v;
      this.time = v + ":00";
      this.showTime = false;
    },
    async submitHandler() {
      let datetime = moment(this.date + " " + this.time).toString();
      let data = {
        service: this.service,
        date: datetime,
      };

      console.log(data);

      try {
        await this.$store.dispatch("patient/bookAppointment", data);
        this.$router.push({ name: "Appointment" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rules {
  max-height: 300px;
  overflow-y: scroll;
}

// .title {
//   font-size: 30px;
// }
</style>

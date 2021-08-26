<template>
  <div class="about">
    <section class="mx-auto">
      <div class="px-1">
        <v-row class="px-4">
          <v-col cols="5">
            <v-select
              v-model="query"
              :items="['Accepted', 'Completed', 'Cancelled', 'Pending']"
              label="Status"
            ></v-select>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
              id="scrolling-techniques-7"
          :loading="loading"
          class=""
          :headers="headers"
          :items="appointments"
          :search="search"
          hide-default-footer
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.date="{ item }">
            {{ filterTime(item.date) }}
          </template>

          <template v-slot:item.time="{ item }">
            {{ filterDate(item.date) }}
          </template>
        </v-data-table>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </section>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      page: 1,
      pageCount: 0,
      query: "",
      search: "",
      loading: false,
      headers: [
        {
          text: "Service",
          align: "start",
          value: "service",
        },
        { text: "Status", value: "status" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
      ],
      appointments: [],
    };
  },
  watch: {
    page() {
      this.paginateData();
    },
    query() {
      this.paginateData();
    },
  },
  methods: {
    getColor(status) {
      if (status == "Cancelled") return "red";
      else if (status == "Pending") return "orange";
      else return "green";
    },

    async paginateData() {
      this.loading = true;
      let appointments = await this.$store.dispatch("patient/getAppointment", {
        page: this.page,
        query: this.query,
      });
      this.pageCount = Math.ceil(appointments.count / 10);
      this.appointments = appointments.appointments;
      this.loading = false;
    },
    filterDate(v) {
      return moment(v).format("hh:mm a");
    },
    filterTime(v) {
      return moment(v).format("LL");
    },
  },
  mounted() {
    this.paginateData();
  },
};
</script>

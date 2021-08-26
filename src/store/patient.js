export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async bookAppointment(context, payload) {
      const headers = context.rootGetters["authentication/headers"];
      try {
        const response = await this._vm.$http.post(
          "appointment/submit",
          payload,
          { headers }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async getAppointment(context, payload) {
      const headers = context.rootGetters["authentication/headers"];
      const page = payload.page ? payload.page : 1;
      const query = payload.query ? payload.query : ''
      console.log(page);
      try {
        const response = await this._vm.$http.get(
          `appointment/list?page=${page}&status=${query}`,
          { headers }
        );
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    //For Admin
    async getAdminAppointment(context, payload) {
      const headers = context.rootGetters["authentication/headers"];
      const page = payload.page ? payload.page : 1;
      const query = payload.query ? payload.query : ''
      const date = payload.date? payload.date:''
    
      try {
        const response = await this._vm.$http.get(
          `appointments/list?page=${page}&status=${query}&date=${date}`,
          { headers }
        );
        const data = response.data;
        console.log(response.data)
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async setAdminAppointment(context, payload) {
      const headers = context.rootGetters["authentication/headers"];

      const appointment = payload;
      console.log(appointment.updatedStatus);
      try {
        const response = await this._vm.$http.put(
          `appointment/${appointment._id}/status`,
          { status: appointment.updatedStatus },
          { headers }
        );
        console.log(response);
        return "Success";
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};

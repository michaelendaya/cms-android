export default {
    namespaced: true,
    state: {
        user: {},
        token: "",
    },
    getters: {
        token: (state) => state.token,
        user: (state) => state.user,
        headers: (state) => {
            return {
                Authorization: "Bearer " + state.token,
            };
        },
    },
    mutations: {

        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, auth_token) {

            state.token = auth_token;
        },
    },
    actions: {
        async singIn(context, payload) {
            try {
                let data = await this._vm.$http.post("signin", payload);
                context.commit("SET_TOKEN", data.data.token);
                context.commit("SET_USER", data.data.user);
                console.log(data)
                return "success";
            } catch (error) {
                console.log(error.response.status);
                let e;
                if (error.response.status == 401) {
                    e = "Invalid User Credentials";
                } else if (error.response.status == 400) {
                    e = "No Such User";
                } else {
                    e = "Internal Service Error";
                }
                throw new Error(e);
            }
        },
    },

}
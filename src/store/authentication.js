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
        CLEAR_TOKEN(state) {
            state.token = null;
        },
        CLEAR_USER(state) {
            state.user = null;
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
        async signUp(context, payload) {
            try {
                let data = await this._vm.$http.post("signup", payload);
                context.commit("SET_TOKEN", data.data.token);
                context.commit("SET_USER", data.data.user);
                console.log(data)
                return "success";
            } catch (error) {
                let e;
                console.log(error);
                if (error.response.data.error.includes("E11000")) {
                    e = "Account Already Exists";
                } else {
                    e = "Internal Service Error";
                }
                throw new Error(e);
            }
        },
        async editProfile(context, payload) {
            const headers = context.rootGetters["authentication/headers"];
            try {
                const data = await this._vm.$http.put(
                    "user", //link or path
                    payload, //data
                    { headers } //token
                );

                context.commit("SET_USER", data.data.user);
                return "success";
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        signOut(context) {
            context.commit("CLEAR_TOKEN");
            context.commit("CLEAR_USER");
        }
    },

}
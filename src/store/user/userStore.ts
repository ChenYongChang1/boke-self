// interface UserInterface {
//   id: Number,
//   username: String,
//   token?: String,
//   userAgent: String
// }

export default {
  namespaced: true,
  state: {
    userInfo: {
      id: "12dsad",
      userAgent: "123",
      userNick: "ddddd",
      userName: "cyc",
      password: "123",
      createTime: "2020-03-27",
      activeNum: 9,
      canEdit: true,
      canCommon: true,
    },
    token: "",
  },
  mutations: {
    setToken(state: any, token: string) {
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
  },
};

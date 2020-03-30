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
      id: "",
      userAgent: "",
      userNick: "",
      userName: "",
      password: "",
      createTime: "",
      activeNum: 0,
      canEdit: false,
      canCommon: false,
      adminUser: false,
    },
    adminUser: {
      id: "12dsad",
      userAgent: "123",
      userNick: "ddddd",
      userName: "cyc",
      password: "123",
      createTime: "2020-03-27",
      activeNum: 9,
      canEdit: false,
      canCommon: false,
      adminUser: true,
      cover: '',
    },
    token: "",
  },
  mutations: {
    setToken(state: any, token: string) {
      state.token = token;
    },
    setUserInfo(state: any, userInfo: any){
      state.userInfo = userInfo
    },
    setAdminUser(state: any, adminUser: any){
      state.adminUser = adminUser
    },
  },
  actions: {
  },
  modules: {
  },
};

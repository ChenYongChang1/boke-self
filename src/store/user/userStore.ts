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
      id: "",
      userAgent: "",
      userNick: "",
      userName: "",
      password: "",
      createTime: "",
      activeNum: '',
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

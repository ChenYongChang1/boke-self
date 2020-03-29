import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { stateinter } from "../interface/store";
import store from "../store/index";
import baseUrl from "./host";

const Axios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

async function tokenLogin() {
  return await Axios.post("/user/login", { userName: "boke", userPassword: "cyc12345" });
}
let responseLogin;
Axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    console.log(store);
    if (config.url === "/user/login") {
      return config;
    }
    if ((store.state as stateinter).userStore.token) {
      config.headers.assToken = (store.state as stateinter).userStore.token;
    } else {
      responseLogin = await tokenLogin();
      store.commit("userStore/setToken", responseLogin.data.data.assToken);
      config.headers.assToken = responseLogin.data.data.assToken;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

export default Axios;

<template>
  <div id="app">
    <vue-particles
      color="#D9D9D9"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#D9D9D9"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <Login v-if="loginFlag" @removeLogin="loginFlag = false"></Login>
    <div class="appcontent">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// tslint:disable-next-line
import requests from "./components/request/requests";
import { clickLove } from "./assets/js/util";
// import axios from "./apis/axios";
import { namespace } from "vuex-class";
const userInfoNameSpace = namespace("userStore");

interface ShowConfInter {
  windPower: number;
  speed: number;
  count: number;
  size: number;
  opacity: number;
  images: string[];
}

@Component({
  components: {
    Login: resolve => require(["./components/Login"], resolve)
  }
})
export default class App extends Vue {
  loginFlag: boolean = false;
  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;

  @userInfoNameSpace.Mutation("setAdminUser") setAdminUser: any;
  @userInfoNameSpace.Mutation("setUserInfo") setUserInfo: any;

  public created() {
    this.$message.config({
      maxCount: 1
    });
    console.log(process);
    clickLove();
    this.getAdminUserInfo();
    // console.log(navigator.userAgent,'navigator.userAgen');
    document.addEventListener("keydown", this.handleEvent);
    if (!(this.userInfo && this.userInfo.id)) {
      if (localStorage.getItem("user")) {
        let user = JSON.parse(localStorage.getItem("user") as string);
        if (!(user && user.id)) {
          this.addUser();
        } else {
          this.setUserInfo(user);
        }
      } else {
        this.addUser();
      }
    }
    // axios.get("/query/querytable?db=video").then(res => {
    //   console.log(res);
    // });
  }
  private async addUser() {
    // let secondsToGo = 5;
    // const modal = this.$success({
    //   title: "This is a notification message",
    //   content: `<div>1111</div>`
    // });
    // const interval = setInterval(() => {
    //   secondsToGo -= 1;
    //   modal.update({
    //     content: `This modal will be destroyed after ${secondsToGo} second.`
    //   });
    // }, 1000);
    // setTimeout(() => {
    //   clearInterval(interval);
    //   modal.destroy();
    // }, secondsToGo * 1000);
    let username = "user_" + Math.random();
    let userMessage = {
      id: Math.random() + "users",
      userAgent: navigator.userAgent,
      userNick: username,
      userName: username,
      password: "123",
      createTime: new Date().toLocaleDateString().replace(/\//g,'-'),
      activeNum: 0,
      canEdit: false,
      canCommon: true
    };
    console.log(navigator.userAgent, "navigator.userAgen");
    let res = await requests.loginRequest({
      userAgent: navigator.userAgent
    });
    console.log(res);
    if (res && res.status == 200 && res.data.code == 200 && res.data.data && res.data.data.Data && res.data.data.Data.length) {
      this.$message.success("登录成功");
      localStorage.setItem("user", JSON.stringify(res.data.data.Data[0]));
      this.setUserInfo(res.data.data.Data[0]);
    } else {
      let resadd = await requests.addUser(userMessage);
      if (resadd && resadd.status == 200 && resadd.data.code == 200) {
        this.$message.success("登录成功");
        localStorage.setItem("user", JSON.stringify(userMessage));
        this.setUserInfo(userMessage);
      }
    }
    // return
    // let res = await requests.addUser(userMessage);
    // if (res && res.status == 200 && res.data.code == 200) {
    //   this.$message.success("登录成功");
    //   localStorage.setItem("user", JSON.stringify(userMessage));
    //   this.setUserInfo(userMessage);
    // }
  }
  handleEvent(e: any) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.loginFlag = true;
    }
    if (e.keyCode === 27 && this.loginFlag) {
      this.loginFlag = false;
    }
  }
  private async getAdminUserInfo() {
    let res = await requests.getAdminUserInfo();
    console.log(res);
    if (
      res &&
      res.status == 200 &&
      res.data.code == "200" &&
      res.data.data.Data &&
      res.data.data.Data.length
    ) {
      console.log(res.data.data.Data[0], "res.data.data.Data");
      this.setAdminUser(res.data.data.Data[0]);
    } else {
      this.setAdminUser({});
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-60px);
  opacity: 0.3;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  transition: width 1s;
  position: absolute;
  right: 0;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
  position: fixed;
}
body {
  width: 100%;
  min-height: 200vh;
  background: url("http://106.14.212.56/tim.jpg") fixed;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  cursor: url(https://files.cnblogs.com/files/wkfvawl/cursor.ico), auto;
  overflow:overlay;
}
#particles-js {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.appcontent {
  // position: relative;
  width: 80%;
  min-width: 1000px;
  max-width: 1400px;
  z-index: 1;
  margin: auto;
  color: gray;
}
</style>



  
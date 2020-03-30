<template>
  <header class="header-box">
    <div class="logo">
      <!-- <img src="../assets/image/logo.jpg" alt=""> -->
      happysheep
    </div>
    <div class="login" v-if="userInfo && userInfo.canEdit" @click="addActives">+</div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import requests from "./request/requests";
const userInfoNameSpace = namespace("userStore");
@Component
export default class Header extends Vue {
  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;
  async addActives() {
    let addactiveItem = {
      id: Math.random()+ 'actives',
      title: "默认标题",
      userId: this.userInfo.id,
      createTime: new Date().toLocaleDateString().replace(/\//g,'-'),
      lookNum: 0,
      cover: "",
      toTop: true,
      catalog: []
    };
    let res = await requests.addActives(addactiveItem)
    this.$emit('reloadList')
    console.log(res);
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .logo {
    // width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 600;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .login {
    width: 30px;
    text-align: center;
    background: gainsboro;
    height: 30px;
    font-size: 13px;
    line-height: 30px;
    &:hover {
      font-weight: 550;
      color: red;
    }
  }
}
</style>

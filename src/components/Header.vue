<template>
  <header class="header-box">
    <div class="logo">
      <!-- <img src="../assets/image/logo.jpg" alt=""> -->
      happysheep
    </div>
    <div class="login" v-if="userInfo && userInfo.canEdit">
      +
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const userInfoNameSpace = namespace("userStore");
@Component
export default class Header extends Vue {
  @userInfoNameSpace.State((state) => state.useInfo)
  userInfo: any
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
  .logo{
    // width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 600;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .login{
    height: 30px;
    font-size: 13px;
    line-height: 30px;
    &:hover{
      font-weight: 550;
      color: red;
    }
  }
}
</style>

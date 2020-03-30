<template>
  <div class="login">
    <div class="login-inner">
      <div>
        <a-input v-model="formInline.userName" placeholder="Username">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </div>
      <div>
        <a-input v-model="formInline.password" type="password" placeholder="Password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </div>
      <div>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
          @click="handleSubmit"
        >Login</a-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import requests from './request/requests'
import { namespace } from "vuex-class";
const userInfoNameSpace = namespace("userStore");
@Component({})
export default class Login extends Vue {
  formInline: { userName: string; password: string } = {
    userName: "",
    password: ""
  };
  handleSubmit(e: any) {
    console.log(this.formInline);
    this.loginRequest()
  }
  @userInfoNameSpace.Mutation("setUserInfo") setUserInfo:any;
  private async loginRequest(){
    let res = await requests.loginRequest(this.formInline)
    if(res && res.status == 200 && res.data.code == "200" && res.data.data.Data && res.data.data.Data.length){
      this.$message.success('登陆成功');
      this.setUserInfo(res.data.data.Data[0])
      this.$emit('removeLogin')
    }
    console.log(res);
  }
}
</script>

<style scoped lang="scss">
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  .login-inner {
    position: absolute;
    background: white;
    width: 600px;
    border-radius: 5px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    span {
      margin-bottom: 10px;
    }
  }
}
</style>
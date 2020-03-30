<template>
  <div class="sidbar">
    <a-modal title="留言" v-model="visible" @ok="handleOk" >
      <a-input v-model="message"></a-input>
    </a-modal>
    <div>
      <div class="head-img">
        <img :src="adminUser.cover" alt />
        <div class="change-img" v-if="userInfo.adminUser">更换头像</div>
        <div class="change-img" @click="showModal" v-else>给我留言</div>
      </div>
      <div class="person-info">
        <div class="pereson-sign">{{ adminUser.personSign }}</div>
        <div class="person-music">
          <iframe
            frameborder="no"
            border="0"
            marginwidth="0"
            width="200"
            height="86"
            marginheight="0"
            :src="personMessage.music"
          ></iframe>
        </div>
        <div class="edit-statistics">
          <div>昵称： {{adminUser.userNick}}</div>
          <div>访问： {{readPeople}}人</div>
          <div>创建时间： {{adminUser.createTime}}</div>
          <!-- <div>最近上传： {{adminUser.createTime}}</div> -->
        </div>
        <div class="calendar">
          <a-calendar :fullscreen="false" />
          <!-- @panelChange="onPanelChange" -->
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import requests from './request/requests'
const userInfoNameSpace = namespace("userStore");

@Component({})
export default class Sidbar extends Vue {
  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;
  @userInfoNameSpace.State(state => state.adminUser)
  adminUser: any;
  message:string='';
  visible: boolean = false;
  readPeople:number = 0;
  personMessage: { music: string } = {
    music:
      "https://music.163.com/outchain/player?type=2&id=31134621&auto=1&height=66"
  };
  showModal() {
    this.visible = true;
  }
  created(){
     this.loginRequest()
  }
  handleOk() {
    // console.log(e);
    // this.visible = false;
    this.liuyanSend()
  }
  private async loginRequest(){
    let res= await requests.loginRequest({})
    console.log(res,'ddddddddddddddddddddddddddddddddddd');
    if(res && res.status == 200 && res.data.code == 200 && res.data.data){
      this.readPeople = res.data.data.length;
    }
  }
  private async liuyanSend(){
    if(!this.userInfo.id){
      this.$message.error('没有登录')
      return 
    }
    let res = await requests.liuyanSend({
      id: Math.random(),
      userId: this.userInfo.id,
      createTime: new Date(),
      message: this.message
    })
    if(res && res.status == 200 && res.data.code ==200){
      this.$message.success('留言成功')
      this.visible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.sidbar {
  width: 100%;
  div {
    .head-img {
      width: 200px;
      height: 200px;
      position: relative;
      // margin: 20px auto;
      border-radius: 10px;
      transition: all 0.5s;
      overflow: hidden;
      .change-img {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: white;
        color: gray;
        position: absolute;
        left: 0;
        top: 200px;
        font-size: 13px;
        transition: top 0.5s;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1);
        transition: all 1s;
        // &:hover {
        //   transform: scale(1.1);
        // }
      }
      &:hover {
        border-radius: 10px 10px 0 0;
      }
      &:hover img {
        transform: scale(1.1);
      }
      &:hover .change-img {
        top: 170px;
      }
    }
    .person-info {
      background: rgba(255, 255, 255, 0.5);
      margin-top: 10px;
      padding-top: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      div {
        font-size: 13px;
      }
      .pereson-sign {
        width: calc(100% - 20px);
        padding: 10px;
        box-sizing: border-box;
        background: white;
        border-radius: 10px;
        margin: 0 10px;
        // margin-bottom: 0;
      }

      .edit-statistics {
        width: calc(100% - 20px);
        // margin-top: 10px;
        margin: 0 10px;
        padding: 10px;
        box-sizing: border-box;
        background: white;
        border-radius: 10px;
      }
      .calendar::v-deep {
        width: 200px;
        margin-top: 10px;
        .ant-fullcalendar-header {
          display: none;
          background: red;
        }
        .ant-fullcalendar-calendar-body {
          padding: 8px;
        }
      }
    }
  }
}
</style>

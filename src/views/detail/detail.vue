<template>
  <div class="detail-view">
    <transition name="slide-fade">
      <div class="edit-components" v-if="editFlag">
        <div class="edit-inner">
          <editMakeDownComponents></editMakeDownComponents>
        </div>
      </div>
    </transition>

    <div class="detail-left">
      <a-menu
        @click="handleClick"
        style="width: 256px"
        :defaultSelectedKeys="['1']"
        :openKeys.sync="openKeys"
        mode="inline"
      >
        <a-sub-menu @titleClick="titleClick" v-for="item in siddbarList" :key="item.id">
          <span slot="title">
            <!-- <a-icon type="appstore" /> -->
            <span>{{item.name}}</span>
          </span>
          <a-menu-item :key="childItem.id" v-for="childItem in item.children">{{childItem.name}}</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="detail-right">
      <div class="edit-btn" v-if="userInfo.canEdit">
        <a-button type="primary">edit</a-button>
      </div>
      <div v-html="contentMakeDown.text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { siddBarInter, activeInter } from "../../interface/views/detail";
import requests from "./request/request";
import { namespace } from "vuex-class";

const userInfoNameSpace = namespace("userStore");

@Component({
  components: {
    editMakeDownComponents: resolve =>
      require(["../../components/editMakeDown.vue"], resolve)
  }
})
export default class Detail extends Vue {
  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;

  public id: string | number = "";
  public openKeys: Array<string | number> = [];
  public siddbarList: siddBarInter[] = [
    {
      id: Math.random(),
      name: "第一章title",
      children: [
        {
          id: Math.random(),
          name: "第一节title"
        },
        {
          id: Math.random(),
          name: "第二节title"
        }
      ]
    }
  ];
  public contentMakeDown: activeInter = {
    id: "",
    createTime: "",
    text: "",
    userId: ""
  };
  private editFlag: boolean = true;

  // private userInfo:any = userInfoNameSpace.State
  public created() {
    this.id = this.$route.params.id;
    console.log(this.userInfo, "userInfo");
    this.watchOpenKeys(this.siddbarList[0]);
    this.getMdtest();
  }

  @Watch("openKeys")
  public watchOpenKeys(newVal: siddBarInter) {
    console.log(newVal, "watch");
  }

  private editShowHide(flag?: boolean | undefined) {
    this.editFlag =
      typeof flag === "undefined" ? !this.editFlag : flag || false;
  }
  public setDefaultOpen(siddbarObj: siddBarInter) {
    this.openKeys = [siddbarObj.id];
  }
  public handleClick(e: any) {
    console.log("click", e);
  }
  public titleClick(e: any) {
    console.log("titleClick", e);
  }
  private async getMdtest() {
    let res = await requests.getMdtest();
    this.contentMakeDown = res.data.data.Data[0];
    this.showmakedown(this.contentMakeDown.text);
    console.log(this.contentMakeDown);
  }
  private showmakedown(text: string) {
    //        创建实例
    var converter = new showdown.Converter();
    //        进行转换
    this.contentMakeDown.text = converter.makeHtml(text);
  }
}
</script>

<style lang="scss" scoped>
.detail-view {
  width: 100%;
  // background: rgba($color: #ffffff, $alpha: 0.5);
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .edit-components {
    position: fixed;
    top: -50px;
    left: 0;
    width: 100%;
    min-height: calc(100vh + 50px);
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 999;
    .edit-inner{
      width: 80%;
      margin: auto;
    }
  }
  .detail-left {
    width: 256px;
    position: relative;
    z-index: 1;
    // .ant-menu-sub {
    //   background: rgba($color: #ffffff, $alpha: 0.5);
    // }
  }
  .detail-right {
    width: calc(100% - 270px);
    background: rgba($color: #ffffff, $alpha: 0.5);
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    .edit-btn {
      width: 100px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      right: 20px;
      top: 10px;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
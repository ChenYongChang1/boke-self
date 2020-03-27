<template>
  <div class="detail-view">
    <transition name="slide-fade">
      <div class="edit-components" v-if="editFlag">
        <div class="edit-inner">
          <keep-alive>
            <editMakeDownComponents
              :markdownValue="contentMakeDown.text"
              @saveMakeDown="saveMakeDown"
              @cancelEdit="editShowHide(false)"
            ></editMakeDownComponents>
          </keep-alive>
        </div>
      </div>
    </transition>
    <div class="detail-header">headers</div>
    <div class="detail-content">
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
          <a-button type="primary" @click="editShowHide(true)">edit</a-button>
        </div>
        <!-- v-html="markdown.toHTML(contentMakeDown.text)" -->
        <div class="detail-markdown-content">
          <MarkdownPro
            :isPreview="true"
            :bordered="false"
            :value="contentMakeDown.text"
            :background="'rgba(0,0,0,0)'"
          ></MarkdownPro>
        </div>
      </div>
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
      require(["../../components/EditMakeDown.vue"], resolve),
    MarkdownPro: resolve =>
      require(["../../components/src/components/pro/index.vue"], resolve)
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
  private editFlag: boolean = false;

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
  private saveMakeDown(value: string) {
    this.editShowHide(false);
    this.contentMakeDown.text = value;
    console.log(value);
  }
  private async getMdtest() {
    let res = await requests.getMdtest();
    this.contentMakeDown = res.data.data.Data[0];
    console.log(this.contentMakeDown);
  }
}
</script>

<style lang="scss" scoped>
.detail-view {
  width: 100%;
  // background: rgba($color: #ffffff, $alpha: 0.5);
  .detail-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba($color: #ffffff, $alpha: 0.5);
    border-radius: 5px;
    margin: 10px auto;
  }
  .edit-components {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    min-height: calc(100vh + 50px);
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 999;
    .edit-inner {
      width: 80%;
      background: white;
      border-radius: 5px;
      overflow: hidden;
      margin: auto;
      max-height: 70%;
      overflow-y: auto;
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .detail-content {
    display: flex;
    justify-content: space-between;
    .detail-left {
      width: 256px;
      position: relative;
      z-index: 1;
      .ant-menu{
        background: rgba($color: #ffffff, $alpha: 0.5);
      }
      
    }
    .detail-left::v-deep .ant-menu-submenu > .ant-menu {
        background: rgba($color: #ffffff, $alpha: 0);
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
        z-index: 3;
        right: 20px;
        top: 10px;
        button {
          width: 100%;
          height: 100%;
        }
      }
      .detail-markdown-content{
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
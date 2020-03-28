<template>
  <div class="detail-view">
    <transition name="slide-fade">
      <div class="edit-components" v-if="editFlag">
        <div class="edit-inner">
          <keep-alive>
            <editMakeDownComponents
              :markdownValue="contentMakeDown.text"
              :mdId="id"
              @saveMakeDown="saveMakeDown"
              @cancelEdit="editShowHide(false)"
            ></editMakeDownComponents>
          </keep-alive>
        </div>
      </div>
    </transition>
    <div class="detail-header">
      <div class="detail-home" @click="$router.push({path:'/'})">主页</div>
      {{activeDetail.title}}
      </div>
    <div class="detail-content">
      <div class="detail-left">
        <a-menu
          @click="handleClick"
          style="width: 256px"
          v-if="selectedKey && selectedKey.length && activeDetail.catalog && activeDetail.catalog.length"
          :defaultSelectedKeys="selectedKey"
          :openKeys.sync="openKeys"
          mode="inline"
        >
          <a-sub-menu @titleClick="titleClick" v-for="item in activeDetail.catalog" :key="item.id">
            <span slot="title">
              <!-- <a-icon type="appstore" /> -->
              <span>{{item.name}}</span>
            </span>
            <a-menu-item :key="childItem.mdId" v-for="childItem in item.childrens">{{childItem.name}}</a-menu-item>
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
        <div class="detail-markdown-commont">
          <div class="detail-markdown-common-title">
            <span>评论：</span>
            <span>查看({{activeDetail.lookNum}});回复({{activesCommonList && activesCommonList.length}})</span>
          </div>
          <div>
            <DetailCommon
              v-if=" activesCommonList && activesCommonList.length"
              @addComonUpdata="addComonUpdata"
              :activesCommonList="activesCommonList"
            />
          </div>
          <div class="writecomon">
            <a-input
              placeholder="说点啥吧。。。"
              v-model="commonNewInsert.text"
              @keyup.enter="saveCommon()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  siddBarInter,
  activeInter,
  activeDetailInter,
  activesCommon
} from "../../interface/views/detail";
import requests from "./request/request";
import { namespace } from "vuex-class";

const userInfoNameSpace = namespace("userStore");

@Component({
  components: {
    editMakeDownComponents: resolve =>
      require(["../../components/EditMakeDown.vue"], resolve),
    MarkdownPro: resolve =>
      require(["../../components/src/components/pro/index.vue"], resolve),
    DetailCommon: resolve =>
      require(["../../components/DetailCommon.vue"], resolve)
  }
})
export default class Detail extends Vue {
  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;
  // siddBarInter
  public id: string | number = "";
  public openKeys: Array<string | number> = [];
  private selectedKey: Array<string | number> = [];
  public activeDetail: activeDetailInter = {
    id: "",
    title: "",
    userId: "",
    createTime: "",
    lookNum: 0,
    cover: "",
    toTop: true,
    catalog: []
  };
  private activesCommonList: activesCommon[] = [];
  public contentMakeDown: activeInter = {
    id: "",
    text: ""
  };
  private editFlag: boolean = false;

  commonNewInsert: activesCommon = {
    id: "",
    mdId: "",
    text: "",
    createTime: "",
    userId: "",
    userNick: "",
    editFlag: false,
    childrensShow: false,
    childrens: []
  };

  private changeCommonIndex: number | null | undefined = null;
  private mdId: string | number = "";
  // private userInfo:any = userInfoNameSpace.State
  public created() {
    this.id = this.$route.params.id;
    console.log(this.userInfo, "userInfo");
    this.getActives();
  }

  @Watch("openKeys")
  public watchOpenKeys(newVal: siddBarInter) {
    console.log(newVal, "watch");
  }
  // 子组件传过来需要修改的childrens id
  addComonUpdata({
    childrens,
    id
  }: {
    childrens: activesCommon;
    id: string | number;
  }) {
    this.addChildrens({
      activesCommonList: this.activesCommonList,
      childrens,
      id
    });
  }
  async addChildrens({
    activesCommonList,
    childrens,
    id
  }: {
    activesCommonList: activesCommon[];
    childrens: activesCommon;
    id: string | number;
  }) {
    await this.editTreeData(activesCommonList, childrens);
    activesCommonList &&
      (activesCommonList[
        this.changeCommonIndex as number
      ].childrensShow = true);
    this.activesCommonList = JSON.parse(JSON.stringify(activesCommonList));
    this.addcommon("updata");
  }
  editTreeData(
    treeData: activesCommon[],
    newTreeNode: activesCommon,
    nowIndex?: number | undefined
  ) {
    for (let i = 0, len = treeData.length; i < len; i++) {
      if (this.activesCommonList.some(item => item.id == treeData[i].id)) {
        nowIndex = i;
      }
      if (treeData[i].childrens) {
        this.editTreeData(treeData[i].childrens || [], newTreeNode, nowIndex);
      }
      if (treeData[i].id === newTreeNode.id) {
        treeData[i] = newTreeNode;
        this.changeCommonIndex = nowIndex;
      }
    }
    return treeData;
  }

  private editShowHide(flag?: boolean | undefined) {
    this.editFlag =
      typeof flag === "undefined" ? !this.editFlag : flag || false;
  }
  public setDefaultOpen(siddbarObj: siddBarInter | undefined) {
    console.log(siddbarObj,'siddbarObjsiddbarObjsiddbarObjsiddbarObjsiddbarObjsiddbarObj');
    if (typeof siddbarObj == "undefined") {
      return;
    }
    this.openKeys = [siddbarObj.id];
    if (typeof siddbarObj.childrens == "undefined") {
      return;
    }
    this.selectedKey = [siddbarObj.childrens && siddbarObj.childrens[0].id];
  }
  public handleClick(e: any) {
    console.log("click", e);
    this.mdId = e.key;
    this.getMdText(e.key);
  }
  public titleClick(e: any) {
    console.log("titleClick", e);
  }
  private saveMakeDown(value: string) {
    
    this.contentMakeDown.text = value;
    this.updataMakedown(value)
    console.log(value);
  }
  private async updataMakedown(value:string){
    let res = await requests.updataMakedown({id:this.mdId,text:value})
    this.editShowHide(false);
  }
  private async getActives() {
    console.log(this.id, "this.id");
    let res = await requests.getActives(this.id);
    if (res && res.status == 200 && res.data.code == "200") {
      this.activeDetail = res.data.data.Data[0];
      if (this.activeDetail.catalog) {
        this.setDefaultOpen(
          this.activeDetail.catalog && this.activeDetail.catalog[0]
        );
        this.mdId =
          (this.activeDetail.catalog &&
            this.activeDetail.catalog[0].childrens &&
            this.activeDetail.catalog[0].childrens[0].mdId) ||
          "";
        this.getMdText(this.mdId);
      }
    } else {
      this.activeDetail = {
        id: "",
        title: "",
        userId: "",
        createTime: "",
        lookNum: 0,
        cover: "",
        toTop: true,
        catalog: []
      };
    }
  }
  private async getMdText(id: string | number | undefined) {
    this.activesCommonList = [];
    if (typeof id === "undefined") {
      this.contentMakeDown.text = "";
      this.contentMakeDown.id = "";
      return;
    }
    let res = await requests.getMdText(id);
    if (res && res.status == 200 && res.data.code == "200") {
      this.setMarkDownText(res.data.data.Data);
      this.getActivesCommonList(res.data.data.Data[0].id);
    } else {
      this.setMarkDownText([]);
    }
  }
  private async getActivesCommonList(id: string | number) {
    let res = await requests.getActivesCommonList(id);
    if (res && res.status == 200 && res.data.code == "200") {
      this.activesCommonList = res.data.data.Data;
    } else {
      this.activesCommonList = [];
    }
    // activesCommonList
  }
  private async addcommon(flag: string | undefined = "add") {
    if (flag == "updata") {
      console.log(
        this.activesCommonList,
        "this.activesCommonList",
        this.changeCommonIndex as number
      );
      let res = await requests.updataCommon(
        this.activesCommonList[this.changeCommonIndex as number],
        this.activesCommonList[this.changeCommonIndex as number].id
      );
      if (res && res.status == 200 && res.data.code == "200") {
        console.log(res);
      } else {
      }
    } else {
      let res = await requests.addcommon(this.activesCommonList);
      if (res && res.status == 200 && res.data.code == "200") {
        console.log(res);
      } else {
      }
    }
  }
  private async saveCommon() {
    this.commonNewInsert = {
      id: Math.random() + "",
      mdId: this.mdId ,
      text: this.commonNewInsert.text,
      createTime: new Date().toLocaleDateString().replace(/\//g,"-"),
      userId: this.userInfo.id,
      userNick: this.userInfo.userNick,
      editFlag: false,
      childrensShow: false,
      childrens: []
    };
    this.activesCommonList.push({ ...this.commonNewInsert });
    let res = await requests.addcommon(this.commonNewInsert);
    if (res && res.status == 200 && res.data.code == "200") {
      console.log(res);
    } else {
    }
  }
  private setMarkDownText(Data: activeInter[]) {
    if (Data && Data.length) {
      this.contentMakeDown = Data[0];
    } else {
      this.contentMakeDown.text = "";
      this.contentMakeDown.id = "";
    }
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
    text-align: center;
    font-size: 20px;
    position: relative;
    .detail-home{
      position: absolute;
      top: 0;
      line-height: 50px;
      height: 50px;
      left: 10px;
      cursor: pointer;
    }
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
      .ant-menu {
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
      padding-bottom: 10px;
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
      .detail-markdown-content {
        position: relative;
        z-index: 1;
      }
      .detail-markdown-commont {
        position: relative;
        z-index: 1;
        margin-top: 50px;
        border-top: solid 1px gainsboro;
        .detail-markdown-common-title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          // justify-content: space-between;
          box-sizing: border-box;
          // span:last-child{}
          span {
            margin-right: 10px;
          }
        }
        .writecomon {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
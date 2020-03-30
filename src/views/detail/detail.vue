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
      <span v-if="editTitleFlag">
        <a-input
          v-model="activeDetail.title"
          style="width:300px"
          @keydown.enter="changeTitle"
          @keydown.esc="nochangeTitle"
        ></a-input>
      </span>
      <span
        v-else
        @click="userInfo.canEdit && (editTitleFlag = true) && (oldTitle=activeDetail.title)"
      >{{activeDetail.title}}</span>
    </div>
    <div class="detail-content">
      <div class="detail-left">
        <div class="add-chapter" v-if="userInfo.canEdit" @click="addChapter">添加章节</div>
        <!-- v-if="selectedKey && selectedKey.length && activeDetail.catalog && activeDetail.catalog.length" -->
        <a-menu
          @click="handleClick"
          style="width: 256px"
          :defaultSelectedKeys="selectedKey"
          :openKeys.sync="openKeys"
          mode="inline"
        >
          <a-sub-menu
            @titleClick="titleClick"
            v-for="(item, index) in activeDetail.catalog"
            :key="item.id"
          >
            <span slot="title">
              <!-- <a-icon type="appstore" /> -->
              <div
                class="detail-title-sidbar"
                :style="{display: 'flex','justify-content': 'space-between'}"
              >
                <span v-if="editcalalog == item.id && userInfo.canEdit">
                  <a-input v-model="item.name" style="width:120px" @click.stop></a-input>
                </span>
                <span v-else>{{item.name}}</span>
                <span
                  v-if="userInfo.canEdit && editcalalog != item.id"
                  @click.stop="deleChapter(index)"
                >delete</span>
                <span v-if="userInfo.canEdit">
                  <span v-if="editcalalog != item.id" @click.stop="editcalalog = item.id">edit</span>
                  <span v-else @click.stop="saveCatalog">save</span>
                </span>
                <span v-if="userInfo.canEdit" @click.stop="addCatalog(index)">add</span>
              </div>
            </span>
            <a-menu-item :key="childItem.mdId" v-for="(childItem, childIndex) in item.childrens">
              <div
                class="detail-title-sidbar"
                :style="{display: 'flex','justify-content': 'space-between'}"
              >
                <span v-if="editcalalog == childItem.id && userInfo.canEdit">
                  <a-input style="width:120px" @click.stop v-model="childItem.name"></a-input>
                </span>
                <span v-else>{{childItem.name}}</span>
                <span v-if="userInfo.canEdit" @click.stop="editcalalog = childItem.id">
                  <span
                    v-if="userInfo.canEdit && editcalalog != childItem.id"
                    @click.stop="deleCatalog(index, childIndex)"
                    style="margin-right:10px"
                  >delete</span>
                  <span
                    v-if="editcalalog != childItem.id"
                    @click.stop="editcalalog = childItem.id"
                  >edit</span>
                  <span v-else @click.stop="saveCatalog">save</span>
                </span>
              </div>
            </a-menu-item>
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
          <div class="writecomon" v-if="userInfo.canCommon">
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
import { namespace } from "vuex-class";
import {
  activeDetailInter,
  activeInter,
  activesCommon,
  siddBarInter
} from "../../interface/views/detail";
import requests from "./request/request";

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
  public userInfo: any;
  // siddBarInter
  public id: string | number = "";
  public openKeys: Array<string | number> = [];
  public activeDetail: activeDetailInter = {
    id: "",
    title: "",
    userId: "",
    createTime: "",
    userNick:"",
    lookNum: 0,
    cover: "",
    toTop: true,
    catalog: []
  };
  public contentMakeDown: activeInter = {
    id: "",
    text: ""
  };

  public commonNewInsert: activesCommon = {
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
  private selectedKey: Array<string | number> = [];
  private activesCommonList: activesCommon[] = [];
  private editFlag: boolean = false;
  private editcalalog: string | number = "";
  private editTitleFlag: boolean = false;
  private oldTitle: string = "";
  private changeCommonIndex: number | null | undefined = null;
  private mdId: string | number = "";
  // private userInfo:any = userInfoNameSpace.State
  public created() {
    this.id = this.$route.params.id;
    this.remoberPeople();
    this.getActives();
  }

  @Watch("openKeys")
  public watchOpenKeys(newVal: siddBarInter) {
    console.log(newVal, "watch");
  }
  //记录访问人数
  async remoberPeople() {
    let res = await requests.remoberPeople({
      id: Math.random(),
      userId: this.userInfo.id,
      createTime: new Date().toLocaleString(),
      actId:this.id,
    });
    let getremober = await requests.getremoberPeople(this.id);
    if (getremober && getremober.status == 200 && getremober.data.code == 200) {
      this.activeDetail.lookNum = getremober.data.data.length;
      let res = await requests.savelookNum(
        this.id,
        {lookNum:this.activeDetail.lookNum}
      );
    } else {
      this.activeDetail.lookNum = 0;
    }
  }
  // 子组件传过来需要修改的childrens id
  public addComonUpdata({
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
  public async addChildrens({
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
  private nochangeTitle() {
    this.editTitleFlag = false;
    this.activeDetail.title = this.oldTitle;
  }
  //修改标题
  private async changeTitle() {
    await this.saveCatalog();
    this.editTitleFlag = false;
  }
  //添加一级目录
  private async addChapter() {
    let id: any = Math.random();
    console.log(this.activeDetail.catalog, "this.activeDetail.catalog");
    if (typeof this.activeDetail.catalog === "undefined") {
      this.activeDetail.catalog = [
        {
          id: id,
          mdId: Math.random() + "mdchapterid",
          name: "请输入章节名称",
          childrens: []
        }
      ];
    } else {
      this.activeDetail.catalog.push({
        id: id,
        mdId: Math.random() + "mdchapterid",
        name: "请输入章节名称",
        childrens: []
      });
    }
    // await this.saveCatalog();
    this.editcalalog = id;
  }
  // 删除章节
  private deleChapter(index: number) {
    console.log("ddd");
    let that = this;
    this.$confirm({
      title: "删除",
      content: "确定删除该章节？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        (that.activeDetail.catalog as siddBarInter[])[index].isDelete = true;
        await that.saveCatalog();
      }
      // },
    });
  }
  // 删除小节
  private async deleCatalog(indexOne: number, index: number) {
    let that = this;
    this.$confirm({
      title: "删除",
      content: "确定删除该小节？",
      okText: "确认",
      cancelText: "取消",
      async onOk() {
        ((that.activeDetail.catalog as siddBarInter[])[indexOne]
          .childrens as siddBarInter[])[index].isDelete = true;
        // .splice(index, 1);
        await that.saveCatalog();
      }
      // },
    });
    // .splice(index , 1)
  }
  // 添加二级目录
  private async addCatalog(index: number) {
    if (
      typeof this.activeDetail.catalog === "undefined" ||
      typeof this.activeDetail.catalog[index].childrens === "undefined"
    ) {
    } else {
      let id: any = Math.random();
      (this.activeDetail.catalog[index].childrens as siddBarInter[]).push({
        id: id,
        mdId: Math.random() + "mdacid",
        name: "请输入小节名称"
      });
      await this.saveCatalog();
      this.editcalalog = id;
    }
  }
  //保存目录的修改
  private async saveCatalog() {
    let res = await requests.saveCatalog(
      this.id,
      this.activeDetail.catalog,
      this.activeDetail.title
    );
    if (
      res &&
      res.status == 200 &&
      (res.data.code == 200 || res.data.code == 201)
    ) {
      this.editcalalog = "";
      this.$message.success("修改成功");
    }
    console.log(res);
  }
  public editTreeData(
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
  public setDefaultOpen(siddbarObj: siddBarInter | undefined) {
    console.log(
      siddbarObj,
      "siddbarObjsiddbarObjsiddbarObjsiddbarObjsiddbarObjsiddbarObj"
    );
    if (typeof siddbarObj == "undefined") {
      return;
    }
    this.openKeys = [siddbarObj.id];
    if (typeof siddbarObj.childrens == "undefined") {
      return;
    }
    try {
      this.selectedKey = [siddbarObj.childrens && siddbarObj.childrens[0].id];
    } catch (d) {}
  }
  public handleClick(e: any) {
    console.log("click", e);
    this.mdId = e.key;
    this.getMdText(e.key);
  }
  public titleClick(e: any) {
    console.log("titleClick", e);
  }

  private editShowHide(flag?: boolean | undefined) {
    this.editFlag =
      typeof flag === "undefined" ? !this.editFlag : flag || false;
  }
  private saveMakeDown(value: string) {
    console.log(this.contentMakeDown.id);
    if (this.contentMakeDown.id) {
      this.contentMakeDown.text = value;
      this.updataMakedown(value);
    } else {
      console.log("adddddddddddddddddddd");
      this.contentMakeDown.id = this.mdId || Math.random() + "md";
      this.contentMakeDown.text = value;
      this.addMakedown(this.contentMakeDown);
    }

    console.log(value);
  }
  private async addMakedown(contentMakeDown: activeInter) {
    const res = await requests.addMakedown({
      id: contentMakeDown.id,
      text: contentMakeDown.text
    });
    console.log(res);
    this.editShowHide(false);
  }
  private async updataMakedown(value: string) {
    const res = await requests.updataMakedown({ id: this.mdId, text: value });
    this.editShowHide(false);
  }
  private async getActives() {
    console.log(this.id, "this.id");
    const res = await requests.getActives(this.id);
    if (res && res.status == 200 && res.data.code == "200") {
      this.activeDetail = res.data.data.Data[0];
      if (this.activeDetail.catalog) {
        this.setDefaultOpen(
          this.activeDetail.catalog && this.activeDetail.catalog[0]
        );
        console.log(this.activeDetail.catalog, "this.activeDetail.catalog");
        this.mdId =
          (this.activeDetail.catalog &&
            this.activeDetail.catalog[0].childrens &&
            this.activeDetail.catalog[0].childrens.length &&
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
        userNick:"",
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
    const res = await requests.getMdText(id);
    if (res && res.status == 200 && res.data.code == "200") {
      this.setMarkDownText(res.data.data.Data);
      this.getActivesCommonList(res.data.data.Data[0].id);
    } else {
      this.setMarkDownText([]);
    }
  }
  private async getActivesCommonList(id: string | number) {
    const res = await requests.getActivesCommonList(id);
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
      const res = await requests.updataCommon(
        this.activesCommonList[this.changeCommonIndex as number],
        this.activesCommonList[this.changeCommonIndex as number].id
      );
      if (res && res.status == 200 && res.data.code == "200") {
        console.log(res);
      } else {
      }
    } else {
      const res = await requests.addcommon(this.activesCommonList);
      if (res && res.status == 200 && res.data.code == "200") {
        console.log(res);
      } else {
      }
    }
  }
  private async saveCommon() {
    this.commonNewInsert = {
      id: Math.random() + "",
      mdId: this.mdId,
      text: this.commonNewInsert.text,
      createTime: new Date().toLocaleDateString().replace(/\//g, "-"),
      userId: this.userInfo.id,
      userNick: this.userInfo.userNick,
      editFlag: false,
      childrensShow: false,
      childrens: []
    };
    this.activesCommonList.push({ ...this.commonNewInsert });
    const res = await requests.addcommon(this.commonNewInsert);
    if (res && res.status == 200 && res.data.code == "200") {
      console.log(res);
    } else {
    }
  }
  private setMarkDownText(Data: activeInter[]) {
    console.log(Data, "Data");
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
    .detail-home {
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
      .add-chapter {
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: rgba($color: #ffffff, $alpha: 0.5);
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      .ant-menu {
        background: rgba($color: #ffffff, $alpha: 0.5);
      }
      .detail-title-sidbar {
        width: 100%;
        display: flex;
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
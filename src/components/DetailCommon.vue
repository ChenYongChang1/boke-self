<template>
  <div class="detail-markdown-commonlist">
    <div class="detail-markdown-commonitem" v-for="(item,index) in componCommonList" :key="item.id">
      <div class="detail-common-header">
        <div class="detail-common-text" @click="showChildrens(index)">
          <span>{{item.userNick}}：</span>
          <div class="detail-common-content">{{item.text}}</div>
          <span
            class="detail-repeat"
            @click.stop="editFlagChange(index)"
          >回复({{item.childrens && item.childrens.length || 0}})</span>
        </div>
        <div class="detail-repeat-input" v-if="item.editFlag">
          <a-input
            placeholder="说点啥吧。。。"
            v-model="commonNewInsert.text"
            @keyup.enter="saveCommon(index)"
          />
        </div>
      </div>
      <div class="detail-common-children" v-if="item.childrensShow">
        <DetailCommon
          v-if="item.childrens && item.childrens.length"
          :activesCommonList="item.childrens"
          :mdId="mdId"
          @addComonUpdata="addComonUpdata"
        />
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import requests from "./request/requests";
import { activesCommon } from "../interface/views/detail";

import { namespace } from "vuex-class";

const userInfoNameSpace = namespace("userStore");

@Component({
  components: {
    DetailCommon: resolve => require(["./DetailCommon.vue"], resolve)
  }
})
export default class DetailCommon extends Vue {
  @Prop()
  activesCommonList: any;

  @Prop()
  mdId: any;

  @userInfoNameSpace.State(state => state.userInfo)
  userInfo: any;

  componCommonList: activesCommon[] = [];
  commonNewInsert: activesCommon = {
    id: Math.random() + "",
    text: "",
    createTime: "",
    userId: "",
    mdId:this.mdId,
    userNick: "",
    editFlag: false,
    childrensShow: false,
    childrens: []
  };

  created() {
    console.log(this.componCommonList, " this.componCommonList");
    this.componCommonList = JSON.parse(JSON.stringify(this.activesCommonList));
  }
  @Watch("activesCommonList")
  activesCommonListChange(newVal: activesCommon[]) {
    this.componCommonList = JSON.parse(JSON.stringify(newVal));
  }

  saveCommon(index: number) {
    this.commonNewInsert = {
      id: Math.random() + "",
      mdId:this.mdId,
      text: this.commonNewInsert.text,
      createTime: new Date().toLocaleDateString(),
      userId: this.userInfo.id,
      userNick: this.userInfo.userNick,
      editFlag: false,
      childrensShow: false,
      childrens: []
    };
    if (this.componCommonList[index].childrens) {
      (this.componCommonList[index].childrens as activesCommon[]).unshift({
        ...this.commonNewInsert
      });
    } else {
      this.componCommonList[index].childrens = [{ ...this.commonNewInsert }];
    }
    this.componCommonList[index].childrensShow = true;
    this.componCommonList[index].editFlag = false;
    this.commonNewInsert = {
      id: "",
      text: "",
      mdId:this.mdId,
      createTime: "",
      userId: "",
      userNick: "",
      editFlag: false,
      childrensShow: false,
      childrens: []
    };
    // this.$emit('addComonUpdata', {id: this.componCommonList[index].id, childrens: this.componCommonList[index].childrens, index: index})
    this.addComonUpdata({ childrens: this.componCommonList[index], id:this.componCommonList[index].id });
  }
  showChildrens(index: number) {
    this.componCommonList[index].childrensShow = !this.componCommonList[index]
      .childrensShow;
  }
  editFlagChange(index: number) {
    this.componCommonList[index].editFlag = !this.componCommonList[index]
      .editFlag;
  }
  // 子组件传过来需要修改的childrens id
  addComonUpdata({ childrens,id }: { childrens: activesCommon,id:string|number }) {
    console.log(this.componCommonList,'this.componCommonList');
    this.$emit("addComonUpdata", { childrens:childrens, id });
  }
}
</script>

<style lang="scss" scoped>
.detail-markdown-commonlist {
  width: 100%;
  .detail-markdown-commonitem {
    width: 100%;
    border-bottom: solid 1px rgb(231, 231, 231);
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 10px;
    .detail-common-header {
      width: 100%;
      // height: 30px;
      line-height: 30px;
      position: relative;
      .detail-common-text {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .detail-repeat-input {
        width: 100%;
        height: 30px;
        margin-bottom: 10px;
        .ant-input {
          height: 30px;
        }
      }
      span {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail-common-content {
        flex: 1;
      }
      .detail-repeat {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        display: none;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.596);
      }
      &:hover .detail-repeat {
        display: block;
        color: rgb(218, 32, 32);
      }
    }

    .detail-common-children {
      width: 100%;
      padding-left: 3%;
      box-sizing: border-box;
      // .detail-markdown-commonitem {
      //   border-bottom: solid 1px rgb(231, 231, 231);
      // }
      // .detail-markdown-commonitem:last-child {
      //   border-bottom: solid 1px rgba(220, 220, 220, 0);
      // }
    }
  }
  .detail-markdown-commonitem:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: solid 1px rgba(220, 220, 220, 0);
  }
}
</style>
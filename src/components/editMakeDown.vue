<template>
  <div class="edit-make-down">
    <div class="edit-content">
      <div class="edit-input"></div>
      <div class="edit-show" v-html="contentMakeDown.text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { activeInter } from "../interface/views/detail";

@Component
export default class EditMakeDown extends Vue {
  contentMakeDown: activeInter = {
    id: "",
    createTime: "",
    text: "",
    userId: ""
  };
  private showmakedown(text: string) {
    //        创建实例
    var converter = new showdown.Converter();
    //        进行转换
    this.contentMakeDown.text = converter.makeHtml(text);
  }
}
</script>

<style lang="scss" scoped>
.edit-make-down {
  width: 100%;
  .edit-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .edit-input {
      width: 50%;
      border: solid 1px gainsboro;
      box-sizing: border-box;
    }
    .edit-show {
    }
  }
}
</style>
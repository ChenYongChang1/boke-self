<template>
  <div class="edit-make-down">
    <div class="edit-content">
      <div class="edit-input">
        <!-- <mavonEditor v-model="contentMakeDown.text" @save="saveMakeDown"> </mavonEditor> -->
        <MarkdownPro
          @on-save="handleOnSave"
          :value="contentMakeDown"
          placeholderValue="开始你的表演"
          @on-upload-image="uploadImg"
          @on-ready="onReady"
          ref="markdown"
        ></MarkdownPro>
      </div>
      <div class="edit-save">
        <a-button type="primary" @click="$emit('cancelEdit')">取消</a-button>
        <a-button type="primary" @click="handleOnSave({value:that_markdown.currentValue})">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ossSignInter } from "../interface/components/editMakdown";
import requests from "./request/requests";
// import MarkdownPro from './src/components/pro/index';
@Component({
  components: {
    MarkdownPro: resolve => require(["./src/components/pro/index.vue"], resolve)
  }
})
export default class EditMakeDown extends Vue {
  contentMakeDown: string = "";
  ossSignObj: ossSignInter = {
    accessid: "",
    dir: "",
    expire: 0,
    host: "",
    policy: "",
    signature: ""
  };
  // markdown的this
  that_markdown: Vue | null = null;
  that_insertContent: Function = () => {};

  @Prop()
  markdownValue:any

  activated() {
    console.log(this.markdownValue,'this.markdownValue');
    this.contentMakeDown = this.markdownValue
    this.getOssSign();
  }
  onReady({ vm, insertContent }: { vm: Vue; insertContent: Function }) {
    this.that_markdown = vm;
    this.that_insertContent = insertContent;
  }
  handleOnSave({ value, theme }: { value: string; theme?: string }) {
    this.contentMakeDown = value;
    this.$emit('saveMakeDown', this.contentMakeDown)
  }
  async getOssSign() {
    let res = await requests.getOssSign({ dir: "cyc-save" });
    console.log(res);
    if (res && res.status == 200 && res.data.code == 200) {
      this.ossSignObj = res.data.data;
    }
  }
  async uploadImg(file: File) {
    let request = new FormData();
    request.append("OSSAccessKeyId", this.ossSignObj.accessid); //Bucket 拥有者的Access Key Id。
    request.append("policy", this.ossSignObj.policy); //policy规定了请求的表单域的合法性
    request.append("Signature", this.ossSignObj.signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
    //---以上都是阿里的认证策略
    let names = file.name.split(".")[file.name.split(".").length - 1];
    names = new Date().valueOf() + "" + Math.random() + "." + names;
    request.append("key", `${this.ossSignObj.dir}/${names}`); //文件名字，可设置路径
    request.append("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
    request.append("file", file); //需要上传的文件 file
    let that = this;
    return await requests
      .uploadImg(that.ossSignObj.host, request)
      .then((r: any) => {
        // console.log(r,'http://tfoneline.oss-cn-hangzhou.aliyuncs.com/'+`${this.signsObj.dir}/${names}`);
        let imgUrl: string =
          that.ossSignObj.host + "/" + `${this.ossSignObj.dir}/${names}`;
        this.that_insertContent(`\n![image](${imgUrl})\n `);
        return imgUrl;
      })
      .catch((e: any) => {
        // console.log(e,'eeee');
      });
  }
}
</script>

<style lang="scss" scoped>
.edit-make-down {
  width: 100%;
  .edit-content {
    width: 100%;
    .edit-input {
      width: 100%;
      min-height: 300px;
      border: solid 1px gainsboro;
      box-sizing: border-box;
    }
    .edit-save {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      button {
        position: absolute;
        top: 90px;
        right: 10px;
      }
      button:first-child{
        top: 50px;
      }
    }
  }
}
</style>
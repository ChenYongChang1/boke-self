<template>
  <div class="content-index">
    <div class="active-list">
      <div class="active-item" v-for="item in listsActives" :key="item.id">
        <div class="active-time">
          {{ item.creatTime | formatTimeToChinese }}
        </div>
        <div class="active-title">
          <div class="active-img">
            <img
              :src="item.cover || require('../../assets/image/active.png')"
              alt=""
            />
          </div>
          <div class="titles">
            <span>【置顶】</span
            ><span>
              {{ item.title }}
            </span>
          </div>
        </div>
        <div class="active-des">
          摘要：{{ Array.prototype.slice.call(item.describe,0, 120).join('')}} <span>阅读原文</span>
        </div>
        <div class="active-common">
          2020-03-25 美羊羊 阅读 ({{item.readPeopleNum}}) 评论 ({{item.commentNum}})
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface activeInter {
  id: Number;
  title: String;
  cover: String;
  creatTime: String;
  describe: String;
  readPeopleNum: Number;
  commentNum: Number;
}

@Component({
  filters: {
    formatTimeToChinese: (time: String) => {
      try {
        let timeArr: string[] = time.split("-");
        return timeArr[0] + "年" + timeArr[1] + "月" + timeArr[2] + "日";
      } catch (e) {
        return time;
      }
    }
  },
  components: {}
})
export default class Index extends Vue {
  listsActives: activeInter[] = [
    {
      id: 1,
      title: "初始title",
      cover: "",
      creatTime: "2020-03-25",
      describe:
        "出师表先帝创业未半而中道崩殂,今天下三分，益州疲弊此诚危急存亡之秋也。然侍卫之臣不懈于内忠志之士忘身于外者盖追先帝之殊遇,欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。【作者】诸葛亮 【朝代】三国时期 工具 第一篇： celery异步任务框架 第二",
      readPeopleNum: 10,
      commentNum: 5
    }
  ];
}
</script>

<style lang="scss" scoped>
.content-index {
  width: 100%;
  .active-list {
    width: 100%;
    .active-item {
      width: 100%;
      min-height: 150px;
      // box-shadow: 3px 5px 5px -2px gray;
      background: rgba($color: #ffffff, $alpha: 0.5);
      // box-shadow: 1px 1px 1px 1px rgba(228, 228, 228);
      border-radius: 5px;
      padding: 0 10px;
      box-sizing: border-box;
      transition: all 0.4s;
      .active-time {
        width: 100%;
        height: 50px;
        text-align: center;
        border-bottom: solid 1px rgba(236, 236, 236, 0.942);
        box-sizing: border-box;
        line-height: 50px;
        font-size: 20px;
        color: #333333;
      }
      .active-title {
        width: 100%;
        height: 67px;
        line-height: 67px;
        border-left: solid 5px rgba(33, 160, 139, 0.9);
        padding-left: 5px;
        border-bottom: dotted 1px rgba(236, 236, 236, 0.942);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .active-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }
        .titles {
          font-size: 20px;
          color: #21759b;
        }
      }
      .active-des{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        line-height: 20px;
        span{
          color: #333333;
          &:hover{
            text-decoration: goldenrod;
            color: goldenrod;
          }
        }
      }
      .active-common{
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
      }
    }
    .active-item:hover{
      box-shadow: 0px 11px 10px 2px rgba(128, 128, 128, 0.658);
    }
  }
}
</style>

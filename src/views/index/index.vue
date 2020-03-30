<template>
  <div class="content-index">
    <div class="screen-list">
      <div class="active-count">总文章：{{activesNum}}</div>
      <div class="screen-time">
        <a-dropdown placement="bottomCenter">
          <a-button>{{screenTimeList.find(item => item.id == screenTimeShow).name}}</a-button>
          <a-menu slot="overlay">
            <a-menu-item
              v-for="item in screenTimeList"
              :key="item.id"
              @click="changeSceen(item.id)"
            >
              <a>{{item.name}}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="active-list">
      <div class="active-item" v-for="item in listsActives" :key="item.id" @click="$router.push({path:'/detail/'+item.id})">
        <div class="active-time">{{ item.creatTime | formatTimeToChinese }}</div>
        <div class="active-title">
          <div class="active-img">
            <img :src="item.cover || require('../../assets/image/active.png')" alt />
          </div>
          <div class="titles">
            <span v-if="item.toTop">【置顶】</span>
            <span>{{ item.title }}</span>
          </div>
        </div>
        <div class="active-des">
          摘要：{{ Array.prototype.slice.call(item.describe,0, 120).join('')}}
          <span>阅读原文</span>
        </div>
        <div
          class="active-common"
        >{{item.createTime}} 美羊羊 阅读 ({{item.lookNum}})</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { activeInter, screenTimeInter } from "../../interface/views/index";
import requests from "./request/requests";
@Component({
  filters: {
    formatTimeToChinese: (time: string) => {
      try {
        const timeArr: string[] = time.split("-");
        return timeArr[0] + "年" + timeArr[1] + "月" + timeArr[2] + "日";
      } catch (e) {
        return time;
      }
    },
  },
  components: {},
})
export default class Index extends Vue {
  public listsActives: activeInter[] = [
  ];
  public screenTimeList: screenTimeInter[] = [
    {
      id: 1,
      name: "按时间顺序",
    },
    {
      id: 2,
      name: "按时间倒序",
    },
  ];
  public screenTimeShow: number = 2;
  private activesNum: number = 0;

  public created() {
    this.getActives();
  }

  public changeSceen(id: number) {
    this.screenTimeShow = id;
  }
  private async getActives() {
    const res = await requests.getActives();

    if (res && res.status == 200 && res.data.code == "200") {
      console.log(res.data.data.Data);
      res.data.data.Data.forEach((element: any) => {
        element.describe = "太懒了";
      });
      this.listsActives = res.data.data.Data;
      this.activesNum = res.data.data.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.content-index {
  width: 100%;
  .screen-list {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    box-sizing: border-box;
    .screen-time {
      width: 100px;
      height: 30px;
    }
    .active-count{
      height: 30px;
      line-height: 30px;
      margin-right: 20px;
    }
  }
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
      border-top: solid 1px gainsboro;
      border-bottom: solid 1px gainsboro;
      transition: all 0.4s;
      margin-bottom: 10px;
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
      .active-des {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        line-height: 20px;
        span {
          color: #333333;
          &:hover {
            text-decoration: goldenrod;
            color: goldenrod;
          }
        }
      }
      .active-common {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
      }
    }
    .active-item:hover {
      border-top: solid 1px rgba(220, 220, 220, 0);
      border-bottom: solid 1px rgba(220, 220, 220, 0);
      box-shadow: 0px 11px 10px 2px rgba(128, 128, 128, 0.658);
    }
  }
}
</style>

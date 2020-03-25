<template>
  <div class="sidbar">
    <div>
      <div class="head-img">
        <img src="../assets/image/header.jpg" alt="" />
        <div class="change-img" v-if="nowLoginUser">
          更换头像
        </div>
        <div class="change-img" v-else>
          给我留言
        </div>
      </div>
      <div class="person-info">
        <div class="pereson-sign">{{ personSign }}</div>
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
          <div>昵称： 快乐的美羊羊</div>
          <div>园龄： 8个月</div>
          <div>访问： 100人</div>
          <div>最近上传： 2020-03-25</div>
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

<script>
export default {
  data() {
    return {
      personSign: "干程序员啥都好，就是头冷。",
      nowLoginUser: true,
      personMessage: {
        music:
          "https://music.163.com/outchain/player?type=2&id=31134621&auto=1&height=66"
      }
    };
  }
};
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

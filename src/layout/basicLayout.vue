<template>
  <div class="container">
    <div
      :class="headerShowHideFlag ===0 ? 'header bgcolor' : headerShowHideFlag ===1 ? 'header bgcolor header-show' : 'header bgcolor header-none' "
      @mouseover="mouseover"
      @mouseleave="mouseleave"
    >
      <Header />
    </div>
    <div class="content">
      <div class="left">
        <Sidbar></Sidbar>
      </div>
      <div class="right bgcolor">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import _ from "lodash";

let headerShowHideInter: number | null = null;
@Component({
  components: {
    Header: (resolve) => require(["../components/Header"], resolve),
    Sidbar: (resolve) => require(["../components/Sidbar"], resolve),
  },
})
export default class Basic extends Vue {
  public oldScrollPosition: number = 0;
  public newScrollPosition: number = 0;
  public headerShowHideFlag: number = 0; // 0 原始位置 1出现  2消失
  public created() {
    this.listenerFunction();
    this.handleScroll();
  }
  public listenerFunction() {
    document.addEventListener(
      "scroll",
      // _.debounce(this.handleScroll, 80),
      this.handleScroll,
      true,
    );
  }
  public mouseover() {
    this.headerShowHideFlag = 1;
    headerShowHideInter && clearInterval(headerShowHideInter);
  }
  public mouseleave() {
    headerShowHideInter = setInterval(() => {
      this.handleScroll();
    }, 1500);
  }
  public handleScroll() {
    this.newScrollPosition = window.pageYOffset;
    if (this.newScrollPosition <= 0) {
      this.headerShowHideFlag = 0;
      return;
    }
    if (this.newScrollPosition < this.oldScrollPosition + 20) {
      this.headerShowHideFlag = 1;
      headerShowHideInter && clearInterval(headerShowHideInter);
      headerShowHideInter = setInterval(() => {
        this.headerShowHideFlag = 2;
      }, 3000);
    } else if (this.newScrollPosition > 80 && this.newScrollPosition > this.oldScrollPosition + 20) {
      this.headerShowHideFlag = 2;
    }
    this.oldScrollPosition = this.newScrollPosition;
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 20px auto;
  position: relative;
  z-index: 1;
  .header {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 20;
    transition: all 0.5s;
    opacity: 1;
  }
  .bgcolor {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
  .header-none {
    top: -50px;
    opacity: 0;
    transition: all 0.5s;
  }
  .header-show {
    top: 0;
    opacity: 1;
    background: white;
    transition: all 0.5s;
  }

  .left {
    // background: rgba(12, 100, 129, 0.1);
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left {
      width: 200px;
    }
    .right {
      width: calc(100% - 276px);
    }
  }
}
</style>

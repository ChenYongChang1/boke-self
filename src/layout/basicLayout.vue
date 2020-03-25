<template>
  <div class="container">
    <div class="header bgcolor">
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

@Component({
  components: {
    Header: resolve => require(["../components/Header"], resolve),
    Sidbar: resolve => require(["../components/Sidbar"], resolve)
  }
})
export default class Basic extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 20px auto;
  .header {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .bgcolor {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
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

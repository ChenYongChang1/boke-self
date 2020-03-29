<template>
  <div id="app">
    <vue-particles
      color="#D9D9D9"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#D9D9D9"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="appcontent">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// tslint:disable-next-line
import { clickLove } from "./assets/js/util";
// import axios from "./apis/axios";

interface ShowConfInter {
  windPower: number;
  speed: number;
  count: number;
  size: number;
  opacity: number;
  images: string[];
}

@Component({
  components: {},
})
export default class App extends Vue {
  public created() {
    console.log(process);
    clickLove();
    // axios.get("/query/querytable?db=video").then(res => {
    //   console.log(res);
    // });
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-60px);
  opacity: 0.3;
}
body {
  width: 100%;
  min-height: 200vh;
  background: url("http://106.14.212.56/tim.jpg") fixed;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  cursor: url(https://files.cnblogs.com/files/wkfvawl/cursor.ico), auto;
}
#particles-js {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.appcontent {
  // position: relative;
  width: 80%;
  min-width: 1000px;
  max-width: 1400px;
  z-index: 1;
  margin: auto;
  color: gray;
}
</style>



  
<template>
  <header class="header-box">
    header
    <!-- <div class="search-input">
      <input type="text" v-model="searchValue" /> 
      <div class="search-select">
        <div v-for="(item,index) in listsInput" :key="index">
          <span  v-hightlight="{item: item.name, temp: searchValue, style:'color:#F96600'}">{{item.name}}</span>
        </div>
      </div>
    </div> -->
  </header>
</template>

<script>
// import { hightLightDirective } from '../directives/directives'
export default {
  data() {
    return {
      searchValue: '',
      listsInput: [
        {
          name: "测试"
        },
        {
          name: "你好"
        },
        {
          name: "你干啥"
        },
        {
          name: "你好呀"
        }
      ],
    }
  },
  directives:{
    // hightlight:hightLightDirective
  },
  computed: {
    computedList: function() {
      console.log(this.listsInput);
      return this.listsInput.filter(
        item => item.name.indexOf(this.searchInput) != -1
      );
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-input {
    width: 200px;
    height: 25px;
    position: relative;
    .search-select {
    }
  }
}
</style>

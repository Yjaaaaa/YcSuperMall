<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="../../../assets/img/home/left.svg" alt="" class="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
        class="title-item"
        :class="{isActive: index == currentIndex}"
        @click='ColorChange(index)'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  components: { NavBar },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      showActive: false,
      currentIndex: 0
    }
  },
  methods: {
    ColorChange(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
    background-color: #fff solid black px ;
  }
  .title-item {
    flex: 1;
    box-shadow: 0 -1px  rgba(100, 100, 100, 0.1);
  }
  .isActive{
    color: skyblue;
  }
  .back{
    /* margin-top: 5px; */
    position: relative;
    top: 2px;
    width: 13px; 
    height: 13px;
  }
</style>
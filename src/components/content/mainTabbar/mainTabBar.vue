<template>
  <tab-bar class="tab">
      <tab-bar-item path='/home' activeColor='skyblue'>
        <img slot='item-icon' src="../../../assets/img/tabbar/home.svg" alt="">
        <img slot='item-icon-active' src="../../../assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
        <div>首页</div>
      </tab-bar-item>
      <!-- 要改变颜色可添加activeColor属性修改颜色 -->
      <tab-bar-item path='/sort' >  
        <img slot='item-icon' src="../../../assets/img/tabbar/sort.svg" alt="">
        <img slot='item-icon-active' src="../../../assets/img/tabbar/sort_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
    
      <tab-bar-item path='/shopping' >
        <img slot='item-icon' src="../../../assets/img/tabbar/shopping.svg" alt="">
        <img slot='item-icon-active' src="../../../assets/img/tabbar/shopping_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
    
      <tab-bar-item path='/profile' >
        <img slot='item-icon' src="../../../assets/img/tabbar/profile.svg" alt="">
        <img slot='item-icon-active' src="../../../assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.tab{
  z-index: 8;
}
</style>
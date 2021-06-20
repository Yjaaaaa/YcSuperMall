<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物gai</div></nav-bar>
      <tab-control :titles="['流行', '新款', '精选']" 
                        @tabClick='tabClick' 
                        ref="tabControl1"
                        class="se-tab-control"
                        v-show="isTabShow"></tab-control>
      <scroll class="content" ref="scroll" 
      :probe-type='3'
      :pull-up-load='true' 
      @scroll="contentScroll"
      @pullingUp='loadMore'>
        <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
          <home-recommend-view :recommends='recommends'></home-recommend-view>
          <feature></feature>
          <tab-control :titles="['流行', '新款', '精选']" 
                        @tabClick='tabClick' 
                        ref="tabConrtol2"></tab-control>
          <good-list-item></good-list-item>
          <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <!-- 组件不能监听点击,需要加上一个native监听根元素的原生事件 -->
      <back-top @click.native='backClick' v-show="isShow"></back-top>
      <router-view></router-view>
    </div>
</template>

<script>
import HomeSwiper from '@/views/home/childComponents/HomeSwiper'
import HomeRecommendView from '@/views/home/childComponents/HomeRecommendView'
import Feature from '@/views/home/childComponents/Feature'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/goods/GoodsList'
import GoodListItem from '@/components/goods/GoodListItem'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from '../../network/home'

export default {
    neme: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      Feature,
      TabControl,
      GoodsList,
      GoodListItem,
      Scroll,
      BackTop,
    },
   
      data() {
      return {
        banners: [],
        recommends: [],
        goods: {
            'pop': {page: 0, list:[]},
            'new': {page: 0, list:[]},
            'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        scroll: null,
        isShow: false,
        tabOffsetTop: 0,
        isTabShow: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {       //created里面写主要逻辑,函数写在methods里面
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')

      this.getHomeGoods('new')

      this.getHomeGoods('sell')

    },
    methods: {
      //事件监听相关的方法
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'; break;
          case 1: 
            this.currentType = 'new'; break;
          case 2:
            this.currentType = 'sell'; break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabConrtol2.currentIndex = index;
      },
      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.scroll.finishPullUp(100)
      })
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)     //1s返回坐标(0, 0)
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShow = position.y < -1000
      // 决定tabControl是否吸顶(position: fixed)
      this.isTabShow = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType) //这一步实在太妙了,数据结构功底在此体现
      // this.$refs.scroll.scroll.refresh()  //解除better-scroll的bug(better-scroll一开始就有计算高度ScrollHeight,当图片加载出来的时候,这个导读会发生变化,导致卡顿)
    },
    debounce(func, delay) {       //封装一个防抖函数
    let timer = null;
    return function(...args) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabConrtol2.$el.offsetTop;
    }
    },
    mounted() {
      // 所有的组件都有$el,可以获取组件中的元素
      // this.tabOffsetTop = this.$refs.tabControl
         //不能在这里使用,因为此时图片还没有加载完
      setTimeout(() => {
        // console.log(this.$refs.tabControl.$el.offsetTop)
      }, 1000)
    },
    updated() {
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.scroll.refresh()    //这里最好进行一次刷新,防止出现回到顶部的bug
    },
    deactivated() {
      // console.log(this.saveY)
      // 这里调用scrool里面封装的getScrollY拿到Home的位置
      this.saveY = this.$refs.scroll.scroll.y
    },
//     destroyed() {
//       console.log('我被销毁了')
//     }
}
</script>

<style scoped>

  #home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;    
  }
  .home-nav{
    background-color: skyblue;
    color: aliceblue;

    /* 以下属性是在浏览器使用原生滚动时为了导航栏不跟着滚动而设置的 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;

  } */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .se-tab-control{
    position: relative;
    z-index: 999;
  }
</style>
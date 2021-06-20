<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content" 
    @pullingUp='loadMore'
    @scroll="contentStroll"
    :probe-type='3'
    :pull-up-load='true'
    ref="scroll">
      <detail-swiper :top-image='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop :shop='shop'></detail-shop>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref="params"></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCard='addToCard'></detail-bottom-bar>
    <back-top @click.native='backClick' v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from '@/views/detail/chilidComponent/DetailNavBar'
import DetailSwiper from '@/views/detail/chilidComponent/DetailSwiper'
import DetailBaseInfo from '@/views/detail/chilidComponent/DetailBaseInfo'
import DetailShop from '@/views/detail/chilidComponent/DetailShop.vue'
import DetailGoodsInfo from '@/views/detail/chilidComponent/DetailGoodsInfo.vue'
import DetailParamInfo from '@/views/detail/chilidComponent/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/chilidComponent/DetailCommonInfo'
import GoodsList from '@/components/goods/GoodsList'   // 直接调用前面的GoodsList对推荐内容进行展示
import DetailBottomBar from '@/views/detail/chilidComponent/DetailBottomBar.vue'



import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '../../network/detail'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'
// import BackTop from '../../components/content/backTop/BackTop.vue'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShow: false,

    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
    created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);

    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
      // console.log(this.recommends)
    })
    
    // 1.获取顶部的轮播数据
    this.topImages = res.result.itemInfo.topImages;
    // console.log(this.topImages)

    const data = res.result;
    // 2.获取商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    // 3.获取店铺信息
    this.shop = new Shop(data.shopInfo)

    // 4.获取商品详情信息
    this.detailInfo = data.detailInfo

    // 5. 获取参数信息
    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

    // 6. 获取评论信息
    if (data.rate.cRate != 0) {    // 有些商品没有评论, 这里需要做一个判断
        this.commentInfo = data.rate.list[0];
      }
    })
    // this.$nextTick(() => {
    // this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
    // })
  },
  methods: {
    loadMore() {

    },
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      // this.getThemeTopY();
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 100)
    },
    contentStroll(position) {
      // console.log(position)
      const positionY = -position.y
      let length = this.themeTopYs.length;

      // positionY和主题中的值对比
      for(let i = 0; i < length - 1; i ++) {
      //  if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
      //    console.log(i)
      //  }
      if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1]))
        // 前面themeTopYs里面多push了一个数, 让判断条件可以减少, 使用的思想是利用空间换时间  
        {
        //  console.log(i)
        this.currentIndex = i;
        // console.log(this.currentIndex);
        this.$refs.nav.currentIndex = this.currentIndex


        }
      // 是否显示回到顶部
      this.isShow = position.y < -1000
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)     //1s返回坐标(0, 0)
    },
    addToCard() {
      // 1. 获取购物车需要展示的信息
      const product = {
      }

      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.$route.params.iid;
      product.count = 1;

      // 2.将商品添加到某一个位置
      // this.$store.commit('AddCounter', product)

      this.$store.dispatch('addCart', product)

    }
  },


}

</script>

<style scoped>
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 58px);
}

</style>
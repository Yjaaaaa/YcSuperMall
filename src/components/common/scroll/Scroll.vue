<template>
  <!-- 用ref可以明确拿到的是这个组件中的wrapper -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
       <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
BScroll.use(ObserveImage)
BScroll.use(PullUp)
BScroll.use(ObserveDOM)
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //创建scrool对象
    this.scroll = new BScroll(this.$refs.wrapper, {
       observeDOM: true,
       click: true,
       observeImage: true,
       debounceTime: 300,       //防抖, 节流是throttle
       probeType: this.probeType,
       pullUpLoad: this.pullUpLoad,
       keepAlive: true
    })
    // console.log(this.scroll)
    //监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })
    //监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
  scrollTo(x, y, time = 1000){      //这样写的原因是在Home里面不用写两次scroll,直接拿到scrollTo方法
      this.scroll.scrollTo(x, y, time)
    }
  },
}
</script>

<style scoped>

</style>
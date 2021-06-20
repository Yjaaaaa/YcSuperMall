<template>
    <div class="wrapper">
      <div class="content">
        <ul>
        <button @click="btnClick">我是按钮</button>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        </ul>
    </div>
    </div>
    
</template>

<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import PullUp from '@better-scroll/pull-up';
BScroll.use(PullDown);
BScroll.use(PullUp)


BScroll.use(PullUp)
export default {
    neme: 'Sort',
    data() {
      return {
        bscroll: null,
        num: 0
      }
    },
    components: {

    },
    create() {
        // this.scroll = new BScroll('.wrapper', {

        // })
      },
    mounted() {         //组件挂载完后调用
    this.bscroll = new BScroll(document.querySelector('.wrapper'), {
    probeType: 3,    //值为0,1都不侦测,当传入2时在手指滚动的过程中侦测,惯性的过程不侦测
                    // 传入3时代表只要滚动都监听
    click: true,
    pullUpLoad: true,
    observeDOM: true
   })
   this.bscroll.on('scroll', (position) => {
     console.log(position)
   })

   this.bscroll.on('pullingUp', () => {
     console.log(123)

     //等数据请求完,并且将新的数据展示出来
     setTimeout(() => {
       this.bscroll.finishPullUp()
     }, 2000)
   })
    },
    methods: {
      btnClick() {
        console.log('我是按钮')
      }
    }
}
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background: skyblue;
    overflow: hidden;
  }
</style>
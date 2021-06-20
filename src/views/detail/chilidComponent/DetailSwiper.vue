<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
// import {swiper, swiperItem} from '../../../components/common/swiper'
import Swiper from '@/components/common/swiper/Swiper'
import SwiperItem from '@/components/common/swiper/SwiperItem'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  },

}
</script>

<style scoped>
.detail-swiper{
  height: 500px;
  overflow: hidden;
}
</style>
<template>
  <div class="feature">
    <a href="http://act.mogujie.com/zzlx67">
      <img src="../../../assets/img/home/recommend.jpg" alt="" @click='imgClick'>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Feature',
  methods: {
    imgClick() {
      console.log('我是图片')
    }
  }
}
</script>

<style scoped>
  .feature img{
    width: 100%;
  }

</style>
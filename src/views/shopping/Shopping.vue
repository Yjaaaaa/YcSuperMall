<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <shop-list/>
      <shop-buttom-bar/>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import ShopList from '@/views/shopping/childComps/ShopList'
import ShopButtomBar from '@/views/shopping/childComps/ShopButtomBar'

import { mapGetters } from 'vuex'
export default {
    neme: 'Shopping',
    components: {
      NavBar,
      ShopList,
      ShopButtomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
}
</script>

<style scoped>

.nav-bar{
  background-color: skyblue;
  color: aliceblue;
  font-weight: 700;
}
</style>
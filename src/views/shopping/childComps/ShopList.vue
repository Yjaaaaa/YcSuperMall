<template>
  <div class="cart-list">
    <scroll class="content"
    @pullingUp='loadMore'
     :pull-up-load='true'
     ref="scroll">
    <shop-list-item v-for="(item, index) in cartList" 
    :key='index' 
    :item-info="item"
    ></shop-list-item>
    </scroll>
  </div>
</template>

<script> 
import { mapGetters } from 'vuex'
import Scroll from '@/components/common/scroll/Scroll'
import ShopListItem from '@/views/shopping/childComps/ShopListItem'
export default {
  name: 'ShopList',
  components: {
    Scroll,
    ShopListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  methods: {
    loadMore() {
      console.log('我到最底了')
    }
  },

}
</script>

<style scoped>
.cart-list{
  height: 100%;
}
.content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
}
/* .cart-list {
  height: 100%;
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  overflow: hidden;
} */
</style>
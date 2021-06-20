<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
      :is-checked='isSelectAll' 
      :is-disapper='isSelectAllTwo' 
      @click.native='checkClick'></check-button>
      <span class="up">全选</span>
    </div>
    <div class="total">
      合计:{{totalPrice}}
    </div>
    <div class="caculate-bgc">
      <div class="caculate">
      去计算:  ({{checkLength}})
    </div>
    </div>
  </div>

</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopButtomBar',
  components: { CheckButton },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    ...mapGetters(['cartList']),
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length == 0){
        return false
      }
      return !(this.cartList.filter(item => !item.checked).length)  // 这里是长度取反,只要上面按钮有一个不选中,那么下面的按钮就不会选中
      // return !this.cartList.find(item => !item.checked)
    },
    isSelectAllTwo() {
      if(this.cartList.length == 0){
        return false
      }
      return !(this.cartList.filter(item => !item.disapper).length)
    }
  },
  methods: {
    checkClick() {
      for(let i = 0; i <= this.cartList.length; i++) {
        this.cartList[i].checked = !this.cartList[i].checked
        this.cartList[i].disapper = !this.cartList[i].disapper
      }
      // for(let j = 0; j <= this.cartList.length; j++) {
      // }
    }
  }
}
</script>

<style scoped>

.bottom-bar{
  position: absolute;
  bottom: 44px;
  height: 40px;
  background-color: #eee;
  width: 100%;
  /* line-height: 40px; */
  display: flex;
} 
.check-content{
  display: flex;
  line-height: 40px;
  /* align-items: center; */
  margin-left: 10px;
  width: 60px;
}
.up{
  margin-top: -4px;
  margin-left: 3px;
}
.total{
  margin: 7px 0 0 5px;

  font-size: 15px;
  flex: 1;
}
.caculate{
  margin: 8px 0 0 5px;
  width: 80px;
  color: #fff;
  font-size: 14px;
}
.caculate-bgc{
  background-color: skyblue;

}
</style>
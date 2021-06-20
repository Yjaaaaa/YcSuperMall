<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="../../../assets/img/shop/checkButton.png" 
    :class="{disapper: isDisapper}">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
    isDisapper: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
  .check-button img {
    height: 20px;
    width: 20px;
  }
  .checked {
    background-color: skyblue;
  }
  .disapper{
    display: none;  
  }
</style>
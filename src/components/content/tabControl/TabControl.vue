<template>
  <div>
    <div class="tab-control">
      <div class="tab-control-item"
           :class="{active: index==currentIndex}"
           v-for='(item, index) in titles' :key="index" 
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span{
  padding: 5px;
}
.active span{
  color: skyblue;
  border-bottom: 3px solid skyblue;
}
</style>
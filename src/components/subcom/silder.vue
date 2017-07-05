<template>
  <div id='sildertmpl'>
    
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,index) in imgs" :key="index">
            <img :src="item.img">
        </mt-swipe-item>
      </mt-swipe>
    
  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
    
    };
  },
  props:["imgs"],   //这个是获取父组件传来的值
}
</script>
<style lang="css" scoped>

	.mint-swipe{
		height: 300px;
	}
	.mint-swipe-item img{
    height: 300px;
		width: 100%;
	}
	.mint-swipe-item{
		width: 100%;
		height: 300px;
	}
  
</style>
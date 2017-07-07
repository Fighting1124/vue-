<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 利用mint-ui中的header组件实现整个系统的头部 -->
		<mt-header fixed title="新闻快报"></mt-header>

		<!-- 2.0 利用vue-router的 <router-view>进行占位 -->
		<router-view></router-view>
		
		<!-- 3.0 利用mui中的tabbar组件实现系统的底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact">
					<span id="bage" class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>

	import {vm,COUNTSTR} from "./kits/vm.js";
	//利用vm.$on()来注册 COUNTSTR这个事件  
		vm.$on(COUNTSTR,function (param) { 
	// 由于 这里存在两个 vm 对象  所以只能通过dom的方式传值
			var bage = document.getElementById("bage");
			bage.innerText = parseInt(bage.innerText) + param;

		 })

    export default{  // es6的导出对象的写法
        data(){  //等价于 es5的 data:function(){
            return {

            }
        },
        methods:{

        },
        created(){

        }
    }
</script>

<style scoped>
	/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/

</style>
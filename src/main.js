// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/home.vue';
import shopcar from './components/shopcar/car.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from "./components/news/newsInfo.vue";
import photoList from "./components/photo/photoList.vue";
import photoInfo from "./components/photo/photoInfo.vue";
import goodsList from "./components/goods/goodsList.vue";
import goodsinfo from "./components/goods/goodsinfo.vue";
import imgdesc from "./components/goods/imgdesc.vue";
import goodscomment from "./components/goods/goodscomment.vue";
// 3.0.2 定义路由规则
var rot = new vueRouter({
	linkActiveClass:'mui-active',  //改变路由激活时的class名称
	routes:[
		{path:"/",redirect:"/home"},  //默认跳转首页
		{path:'/home',component:home},   //首页
		{path:'/shopcar',component:shopcar},  // 购物车
		{path:'/news/newsList',component:newsList}, //新闻资讯列表页面
		{path:"/news/newsInfo/:id",component:newsInfo},  //新闻信息模块
		{path:"/photo/photoList",component:photoList},  //图片分享模块
		{path:"/photo/photoInfo/:id",component:photoInfo},   //图片详情页模块
		{path:"/goods/goodsList",component:goodsList},    //商品列表购买模块
		{path:"/goods/goodsinfo/:id",component:goodsinfo},    //商品详情页模块
		{path:"/goods/imgdesc/:id",component:imgdesc},        //图文详情页模块 
		{path:"/goods/goodscomment/:id",component:goodscomment},  
	]
	});


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

// 5.0 注册mui的css样式
import '../statics/mui/css/mui.css';

// 6.0 导入一个当前系统的全局基本样式
import '../statics/css/site.css';

//7.0 导入 vue-resource
import vueResource from "vue-resource";

Vue.use(vueResource);
//8.0 定义全局过滤器实现日期格式化
import moment from "moment";
Vue.filter("datefmt",function(input,fmtString){
		return moment(input).format(fmtString);
})
//9.0 导入图片预览
import VuePreview from 'vue-preview';
Vue.use(VuePreview)

//10.0 导入图片预览最新
/*import vuePicturePreview from 'vue-picture-preview';
Vue.use(vuePicturePreview)*/
// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:rot,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});
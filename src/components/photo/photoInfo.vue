<template>
  <div id='tmpl'>
        <div id="box">
            <div id="title">
                <h3 v-text="infos.title"></h3>
                <span>{{infos.add_time | datefmt("YYYY-MM-DD")}}</span>&nbsp;&nbsp;
                <span>{{infos.click}}次浏览</span>
                <p class="p"></p>
            </div>
            <!--缩略图-->
             <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in list" :key="index">
                        <img class="preview-img" 
                         :src="item.src" height="100" @click="$preview.open(index, list)">
                        
                    </li>
		        </ul>
             </div>       
            <div v-html="infos.content" id="content"></div>
            
        </div>
        <div id="comment">
            <comment :id="id"></comment>
        </div>
  </div>
</template>
<script>
import common from "../../kits/common.js";
import comment from "../subcom/comment.vue";
import { Toast } from 'mint-ui';
export default {
  name: "component_name",
  data () {
    return {
        id:0,   //图片id
        infos:{}, //存储图片详细信息
         list: [/*{
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 400
        }, {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }*/]  //储存图片缩略图
    };
  },
  components:{
      comment
  },
  created(){
    this.id = this.$route.params.id;    //获取路由id
    this.getinfo();
    this.getimgs();
  },
  methods:{
        getinfo(){
            var url = common.apidomain + "/api/getimageInfo/" + this.id;
            this.$http.get(url).then(function(res){
                if(res.body.status != 0) {
                    // console.log(123)
                    Toast(res.body.message);
                    return;
                }
                this.infos = res.body.message[0];
            })
        },
        getimgs(){
            var url = common.apidomain + "/api/getthumimages/" + this.id;
            
            this.$http.get(url).then(function(res){
                
                 if(res.body.status != 0) {
                    
                    Toast(res.body.message);
                    return;
                }
               //					将正常的逻辑数据赋值给this.list数组
//					由于vue-preview组件要求的数据是 {src:,w:,h:}但是服务器响应回来的数据中是没有 w ,h 的，所以只能自己添加了
					res.body.message.forEach(function(key){
//						当前所有图片不管有多大都设置为宽高为400，就会导致图片失真了，所以应该按照图片的实际尺寸来设置
						var img = document.createElement('img');
						img.src = key.src;
						key.h = img.height;
						key.w = img.width;
					});

                this.list = res.body.message;
        
            })
        }
  }
}
</script>
<style lang="css" scoped>
#box {
    
}
#title {
    padding: 10px;
}
#title h3 {
    color:aqua;
    font-size:16px;
}
#title span {
    font-size:14px;
    color:#ccc;
}
#title .p {
    width: 100%;
	height: 1px;
	border-bottom: 1px solid rgba(0,0,0,0.3);
}
.mui-content {
    padding: 0px;
}
.mui-content,.mui-content ul{
	  background-color: #fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
	  border-right:0px;
	  border-bottom:0px;
  }
  .mui-grid-view.mui-grid-9{
	  border-top:0px;
	  border-left:0px;
  }
.mui-content .mui-table-view-cell{
    padding: 0px;
}
#content {
    color: orangered;
    font-size: 14px;
    padding: 10px;
}
/*9宫格图片大小*/
.mui-content img{
    display: inline-block;
    width: 100px;
    height: 100px;

}
</style>
<template>
    <div id="tmpl">
        <!--图片分类导航-->
        <div id="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getimgs(0)">首页</li>
                <li v-for="(item,index) in cates" :key="index" v-text="item.title" @click="getimgs(item.id)"></li>
               
            </ul>
        </div>
        <!--图片列表显示-->
        <div id="imgList">
                <ul>
                    <li v-for="(item,index) in list" :key="index">
                    <router-link v-bind="{to:'/photo/photoInfo/'+item.id}">
                        <img v-lazy="item.img_url">
                    <div id="zhaiyao">
                        <h5 v-text="item.title"></h5>
                        <p v-text="item.zhaiyao"></p>
                    </div>
                    </router-link>
                    </li>
                </ul>  
        </div>
        
    </div>
</template>


<script>
    import common from "../../kits/common.js";

    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                ulWidth:320,
                cates:[], //储存图片分类路径的数组
                list:[],  //储存图片列表显示路径的数组
            }
            
        },
        created(){
            this.getcate(); //获取图片分类
            var all = 0;
            this.getimgs(all); //获取图片列表
            
        },
        methods:{
            //获取图片分类导航
            getcate(){
                var url = common.apidomain + "/api/getimgcategory";
                this.$http.get(url).then(function(res){
                   if(res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.cates = res.body.message;

                        //实现当前分类数据所在的ul的总宽度 = 分类个数 * 每个分类数据的宽度
                    var w = 66;
                    var count = res.body.message.length + 1;
                    console.log(res.body.message.length)
                    this.ulWidth = w *count;
                })
            },
            getimgs(cateid){
                cateid = cateid || 0;
                var url = common.apidomain + "/api/getimages/"+cateid;
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.list = res.body.message;
                })
            }
        }
    }
</script>

<style scoped>
    #cate {
        width: 320px;
        min-width: 320px;
        overflow-x: auto;
    }
    #cate ul {
        padding-left: 10px;
        margin: 0;
    }
    #cate li {
        list-style: none;
        color:brown;
        display: inline-block;
        font-size: 14px;
        padding-left:10px;
        cursor: pointer;
        line-height: 30px;
    }
    #imgList{
        cursor: pointer;
    }
    #imgList ul {
        padding: 0;
        margin: 0;
    }
    #imgList li {
        list-style: none;
        position: relative;
    }
    #imgList img {
        width:100%;
        height: 300px;
        display: block;
    }
    #imgList #zhaiyao {
        position: absolute;
        bottom: 5px;
        left: 0px;
        background-color: rgba(0,0,0,0.2);
    }
    #imgList #zhaiyao h5 {
        
        color: yellowgreen;
    }
    #imgList #zhaiyao p {
        color: #fff;
    }
    image[lazy=loading] {
         width: 40px;
         height: 300px;
         margin: auto;
    }
</style>

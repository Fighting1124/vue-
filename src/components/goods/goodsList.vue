<template>
    <div id="tmpl">
        <div id="imgsList">
            <div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in list" :key="index">
		            <router-link v-bind ="{to:'/goods/goodsinfo/'+item.id}">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body" v-text="item.title"></div>
                    </router-link>
                    <div id="imgsCon">
                        <p>
                             <span>￥{{item.sell_price}}</span>
                             <s>￥{{item.market_price}}</s>
                        </p>
                        <p>
                                <span class="left">热卖中</span>
                                <span class="right">剩余{{item.stock_quantity}}件</span>
                        </p>
                    </div>
                </li>
		    </ul>
		    </div>
        </div>
    </div>
</template>


<script>
    import common from "../../kits/common.js";
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getimgs();
        },
        methods:{
            // 获取商品列表
            getimgs(){
                var url = common.apidomain + "/api/getgoods?pageindex=1";
                this.$http.get(url).then(function(res){
                    if(res.body.status !=0 ){
                        Toast(res.body.message);
                        return;
                    }
                    this.list = res.body.message;
                })
            },
            // 获取商品详细信息
            getinfo(){

            }
        }
    }
</script>

<style scoped>
    
    #imgsList ul {
        padding: 0px;
    }
    #imgsList li {
        padding: 0px;
        margin: 0px;
        border:1px solid rgba(0,0,0,0.3);
        box-shadow: 1px 1px 2px rgba(0,0,0,0.4);
    }
    #imgsList li a {
        padding: 0;
        margin: 0;
    }
    #imgsList .mui-media-body {
        text-align: left;
        padding-left:10px;
        color: #f40;
    }

    #imgsCon{
        height: 60px;
        background-color:rgba(0,0,0,0.1);
        margin: 10px;
        padding: 5px;
        position: relative
    }
    #imgsCon p:nth-of-type(1){
        text-align: left;
    }
    #imgsCon p:nth-of-type(1) span {
        margin-right: 10px;
        color:red;
        font-size: 16px;
    }
    #imgsCon p:nth-of-type(2){
        position: absolute;
        bottom: 5px;
    }
    
     
</style>

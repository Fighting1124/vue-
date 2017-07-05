<template>
    <div id="tmpl">

        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList " :key="index">
					<router-link v-bind="{to:'/news/newsInfo/'+item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis' v-text="item.zhaiyao"></p>
                            <div class="ft">
                               <span>发表时间:{{item.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                                <span class="click">点击数:{{item.click}}</span>    
                            </div>
						</div>
					</router-link>
				</li>

			</ul>

    </div>
</template>


<script>

import { Toast } from 'mint-ui';

import common from "../../kits/common.js";
    export default {
        data(){
           return {
                newsList:[]
           }
        },
        created(){
            this.getNews();
        },
        methods:{
            getNews(){
                var url = common.apidomain + "/api/getnewslist";
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0) {
                        Toast(res.body.message);

                        return;
                    }
                    this.newsList = res.body.message;
                })
            }
        }
    }
</script>

<style scoped>
.mui-table-view img{
 	height:80px;
 	width:80px;
 }

 .mui-table-view .mui-media-object{
	 max-width: 80px;
	 line-height: 80px;
 }
 .ft{
    font-size:14px;
    margin-top: 1.2em;
    color:#0094ff;
 }
 .ft .click {
     margin-left: 1.5em;
 }
</style>

<template>
  <div id='tmpl'>

    <div id="comment">
        <h3>提交评论</h3>
        <p class="p"></p>
        <textarea class="text" placeholder="请输入评论内容..." v-model="postcontent"></textarea>
        <mt-button type="primary" size="large" @click="postComment">提交</mt-button>
    </div>
    <div id="commentList">
        <h3>评论列表</h3>
        <p class="p"></p>
        <div class="mui-content" v-for="(item,index) in list" :key="index">
            <div class="title">
                    <span>第{{index + 1}}楼</span>
                    <div>
                        <span>用户：{{item.user_name}}</span>
                        <span>发表时间：{{item.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                    </div>
            </div>
            <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
            </ul>
        </div>
        
        <!--获取更多数据-->
        <mt-button type="danger" size="large" @click="getmore">加载更多>></mt-button>
    </div>    
  </div>
</template>
<script>

import common from "../../kits/common.js";

import { Toast } from 'mint-ui';

export default {
  name: "component_name",
  data () {
    return {
        
        postcontent:"",//根据post请求报文体，需要绑定获取文本框的值
        pageindex: 1,
        list:[]
    };
  },
  props:["id"],
  created(){
        this.getCommonList(this.pageindex)
        /*this.list=[
            //数据写死
             {
                user_name: "匿名用户",
                add_time: "2017-07-03T14:16:27.000Z",
                content: "我提交了啊啊啊啊啊"
                },
                {
                user_name: "匿名用户",
                add_time: "2017-07-03T12:31:48.000Z",
                content: "你是二百五"
                },
                {
                user_name: "匿名用户",
                add_time: "2017-07-03T10:42:05.000Z",
                content: "天王盖地虎"
             }
        ]*/
  },
  methods:{
      //提交评论数据
      postComment(){
          var url = common.apidomain + "/api/postcomment/"+this.id;
          if(this.postcontent.trim().length <= 0) {  //trim()清除字符串两端的空白符，判断用户输入的内容不能 为空；
              Toast("您评论的内容不能为空");
              return;
          }

          this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
                Toast(res.body.message);
                //需要将用户输入的内容在评论列表第一行显示,concat关联数组重新渲染
               this.list = [
                    {
                user_name: "匿名用户",
                add_time: new Date(),
                content: this.postcontent
                    }
                ].concat(this.list);

                this.postcontent = "";

          })
      },

      //获取评论数据
      getCommonList(pageindex){
             pageindex = pageindex || 1;
            var url = common.apidomain + "/api/getcomments/"+this.id + "?pageindex=" + pageindex;
            this.$http.get(url).then(function(res){
                //console.log(123)
                if(res.body.status != 0) {
                    // console.log(456)
                    Toast(res.body.message);
                    return;
                }
                //1 this.list = res.body.message;
                //由于加载更多评论那个功能需要将数据添加到list中，所以采用上下文调用或数组关联方法实现
                 this.list = this.list.concat(res.body.message);
                //this.list.push.apply(this.list,res.body.message)
            })
      },
      //加载更多评论
      getmore(){
          this.pageindex ++;
          console.log(this.pageindex);
            this.getCommonList(this.pageindex);
            }
      }
  }

</script>
<style lang="css" scoped>
    #comment {
        padding: 10px;
    }
    #comment h3 {
        margin-bottom: 10px;
    }
    #comment .p {
        height: 0px;
        width: 100%;
        border-bottom: 2px solid rgba(0,0,0,0.3);
        
    }
    #comment .text {
        color: rgba(0,0,0,0.4);
        font-size: 14px;
    }
   
    #commentList {
        padding: 10px;
    }
    #commentList h3 {
        margin-bottom: 10px;
    }
    #commentList .p {
        height: 0px;
        width: 100%;
        border-bottom: 2px solid rgba(0,0,0,0.3);
        
    }
    /*插件标题默认设置样式*/
   .title{
				margin: 20px 15px 7px;
				color: #6d6d72;
				font-size: 15px;
			}
    .mui-table-view-cell {
        color: palevioletred;
    }        
</style>
<template>
  <div id='tmpl'>
    <div id="silder">
        <silder :imgs="list">
            
        </silder>
    </div>
    <div id="buy">
        <h3 v-text="infos.title"></h3>
        <p></p>
        <ul>
            <li>
                市场价：<s>￥{{infos.market_price}}</s> &nbsp;&nbsp;
                销售价：<span>￥{{infos.sell_price}}</span>
            </li>
            <li class="inputli">
                <span>购买数量：</span>
                <inputNumber class="inputNumber" v-on:dataobj="getvalue"></inputNumber>
            </li>
            <li>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
            </li>
        </ul>
    </div>
    <div id="params">
        <h4>商品参数</h4>
        <p class="p"></p>
        <ul>
            <li>
                <p>商品货号：<span v-text="infos.goods_no"></span></p>
            </li>
            <li>
                <p>库存情况：<span v-text="infos.stock_quantity"></span></p>
            </li>
            <li>
                <p>上架时间：<span>{{infos.add_time | datefmt("YYYY-MM-DD")}}</span></p>
            </li>
        </ul>
    </div>
    <div id="other">
        <router-link v-bind="{to:'/goods/imgdesc/'+id}">
            <mt-button type="primary" size="large" class="message">图文详情</mt-button>
        </router-link>
        <router-link v-bind="{to:'/goods/goodscomment/' +id}">
            <mt-button type="danger" size="large">商品评论</mt-button>
        </router-link>
    </div>
  </div>
</template>
<script>
import silder from "../subcom/silder.vue";
import common from "../../kits/common.js";
import { Toast } from 'mint-ui';
//引入 vm 对象和 COUNTSTR常量
import {vm,COUNTSTR} from "../../kits/vm.js";

import inputNumber from "../subcom/inputNumber.vue";


import {setItem,valueObj} from "../../kits/localSg.js";
export default {
  
  data () {
    return {
        id:0,
        list:[],
        infos:{},
        value:1    //表示当前购买商品的数量
    };
  },
  components:{
        silder,
        inputNumber
  },
  created(){
    this.id = this.$route.params.id;
    this.getimgs();
    this.getinfo();
  },
  methods:{
      getimgs(){
          var url = common.apidomain + "/api/getthumimages/" +this.id;
          
          this.$http.get(url).then(function(res){
              //console.log(123)
              if(res.body.status != 0) {
                  Toast(res.body.message);
                  return;
              }
              this.list = res.body.message;
              //console.log(this.list);
          })
      },
      getinfo(){
          
            var url = common.apidomain + "/api/goods/getinfo/" + this.id;
            //console.log(123)
            this.$http.get(url).then(function(res){
                if(res.body.status != 0) {
                  Toast(res.body.message);
                  return;
              }
              this.infos = res.body.message[0];
            })
      },
      getvalue(value){   //获取inputNumber组件传递的值
          this.value = value;
      },
      toshopcar(){

            //触发事件
            vm.$emit(COUNTSTR,this.value);
            //将数据数据保存到 localstorage
            valueObj.goodsid = this.id;
            valueObj.count = this.value;
            setItem(valueObj);
      }
      
  },
  
}
</script>
<style lang="css" scoped>
#silder {
    border:1px solid rgba(0,0,0,0.3);
    margin:5px;
    border-radius: 5px;
  }

  #buy,#params,#other {
      border:1px solid rgba(0,0,0,0.3);
      margin: 5px;
      padding: 5px;
      border-radius: 5px;
  }
  #buy h3 {
      color:#f40;
  }
  #buy .p,#params .p {
      height: 1px;
      border: 1px solid rgba(0,0,0,0.3);
  }
  #buy ul,#params ul {
      margin-top: 10px;
      padding-left: 0px;
  }
  #buy ul li,#params ul li {
      list-style: none;
      margin: 10px 0px;
      font-size: 16px;
      
  }
  
  #buy ul li:nth-of-type(1) span {
      
      color: #f40;
  }
  #buy .inputli {
      position:relative;
  }
  #buy .inputNumber {
      position:absolute;
      left: 85px;
      top: 0px;
  }

  #params h4 {
      color:aqua;
  }
  #params li p {
      font-size:15px;
  }
  #other .message {
      margin-bottom: 10px;
  }
</style>
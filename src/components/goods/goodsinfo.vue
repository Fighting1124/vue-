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
            <li>
                <span>购买数量：</span>
            </li>
            <li>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small">加入购物车</mt-button>
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
        <mt-button type="primary" size="large" class="message">图文详情</mt-button>
        <mt-button type="danger" size="large">商品评论</mt-button>
    </div>
  </div>
</template>
<script>
import silder from "../subcom/silder.vue";
import common from "../../kits/common.js";
import { Toast } from 'mint-ui';
export default {
  
  data () {
    return {
        id:0,
        list:[],
        infos:{}
    };
  },
  components:{
        silder
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
      }
  }
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
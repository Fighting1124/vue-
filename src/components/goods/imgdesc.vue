<template>
  <div id='tmpl'>
      <div id="imgdesc">
            <h3 v-text="desc.title"></h3>
            <p class="p"></p>
            <div v-html="desc.content">

            </div>
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
        id:0,
        desc:{}
    };
  },
  created(){
        this.id = this.$route.params.id;
        this.getimgdesc();
  },
  methods:{
      getimgdesc(){
          var url = common.apidomain + "/api/goods/getdesc/" + this.id;
          this.$http.get(url).then(function(res){
              if(res.body.status != 0) {
                  Toast(res.body.message);
                  return;
              }
              this.desc = res.body.message[0];
          })
      }
  }
}
</script>
<style lang="css" scoped>
#imgdesc {
    padding: 10px;
}
#imgdesc h3 {
    color: #f40;
}
#imgdesc .p {
    margin: 5px 0;
    height: 1px;
    border: 1px solid rgba(0,0,0,0.3);
}


</style>
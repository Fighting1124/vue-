<template>
  <div id='tmpl'>
      
    <comment :id="id">

    </comment>


  </div>
</template>
<script>

import comment from "../subcom/comment.vue";


export default {
  name: "component_name",
  data () {
    return {
        id:0
    };
  },
  components:{
    comment
  },
  created(){
      this.id = this.$route.params.id;
  }
}
</script>
<style lang="css" scoped>
</style>
<template>
  <div>

       <div id="inputNumber">
              <input type="button" value="-" class=" minus" @click="getminus">
              <input type="text" v-model= 'value' class="text">
              <input type="button" value="+" class="add" @click="getadd">  
       </div> 




  </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        value:1
    };
  },
  created(){

  },
  methods:{
      getminus(){
        this.value--;
        if(this.value<=1) {
          return;
        }
         this.datainput(); 
      },
      getadd(){
          this.value++;
          this.datainput(); 
      },
      datainput(){ //定义一个方法 发送子组件传递的值
        this.$emit("dataobj",this.value);
      }
      
  }
  
}
</script>
<style lang="css" scoped>

#inputNumber {
    height: 25px;
    
}
#inputNumber input {
    height:25px;
    line-height: 25px;
    text-align: center;
    outline: none;
    margin: 0;
    padding: 0;

}
#inputNumber .minus,#inputNumber .add {
  width:30px;
  background-color: rgba(0,1,1,0.5);
  color: #fff;
  font-size: 16px;
  
}
#inputNumber .text {
  width:50px;
}
</style>
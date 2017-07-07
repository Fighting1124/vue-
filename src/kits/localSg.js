
// 负责操作localStorage的帮助文件
/*
*  获取数据：var Str  =localStorage.getItem(key);
*  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
*  移除数据 ： localStorage.removeItem(key);
* */

//定义常量key ， 将来操作localstorage中的key都以这个常量key作为标识
export const key = "goodsdata";

export  var valueObj = {goodsid:0,count:0};
//实现数据添加
//value 是一个json格式的字符串
export function setItem(value){ //因为上面定义了key所以函数setItem这里不需要写形参key

    //获取数据
    var jsonStr = localStorage.getItem(key);
    console.log(jsonStr)
    jsonStr = jsonStr || "[]";

    var arr = JSON.parse(jsonStr);
    //将value 追加进arr
      arr.push(value);
    //将arr转换成json对象 保存起来
    localStorage.setItem(key,JSON.stringify(arr));
}

//实现数据获取

export function getItem(){
    
    var jsonStr = localStorage.getItem(key);
    jsonStr = jsonStr || "[]";
    //将json格式的字符串转换成对象
    return JSON.parse(jsonStr);
    
}

//实现数据移除
export function removeItem(){
    localStorage.removeItem(key);
}
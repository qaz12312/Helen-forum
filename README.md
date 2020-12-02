# 後端 - Helen

## 前端接口
+ [index.php]()
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 後端頁面
+ [connectDB.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/connectDB.php)
    + 目前db連接有誤
+ [index.php]()
    + 新建中
+ []()
+ []()



## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```

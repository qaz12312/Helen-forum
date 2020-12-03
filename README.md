# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 後端自己debug
+ 放在測試資料夾
+ [test.php debug會用到]()
+ [logIn.php 是示範]

## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```

#### git
+ finish all 測試過了+code沒問題
+ finish: 完成的東西
    - Description寫還剩什麼
+ ok: test什麼功能

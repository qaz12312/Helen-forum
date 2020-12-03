# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 後端自己debug
+ 放在測試資料夾
+ [test.php debug會用到](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/test.php)
+ [logIn.php 是示範](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/logIn.php)
+ 將test.php和你要測試的檔案丟到C:\xampp\htdocs下，然後開Chrome打網址http://localhost/你要測試的檔名.php
### 這是範例!!!所以不要改到這兩個檔

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

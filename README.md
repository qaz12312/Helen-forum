# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + (在PHPs資料夾)個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

+ 記得到[Trello](https://trello.com/b/2amh64r0/helen)做紀錄

### 有問題可以先上[Trello](https://trello.com/b/2amh64r0/helen)相關連結的`問題集`看~



## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```

### 紀錄dir
+ old version 12-14 : 12/14日完成的
+ PHPs : 目前在master的版本，最穩定版，12/17日完成的
+ add token : account、permission、登入ip、操作紀錄檔
+ 加解密 : passward、account

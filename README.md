# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + (在PHPs資料夾)個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

### 記得到[Trello](https://trello.com/b/2amh64r0/helen)做紀錄

### 有問題可以先上[Trello](https://trello.com/b/2amh64r0/helen)相關連結的`後端問題集`看~

### 紀錄dir
+ version1 12-14 : 非PDO，12/14日完成的
+ version2 12-27 : 未加入token、加密
+ PHPs : 目前在master的版本，加入token(account、permission、登入ip、操作紀錄檔) + (加解密account、password)

## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```
### token
```
$str = accountID."010helen";
$token = base64_encode($str);
$_SESSION[$token] = array("account"=>accountID,"permission"=>1/2/3,"ip"=>ip位址,"log"=>log操作紀錄);
```
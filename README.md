# 後端 - Helen

## 頁面
+ [connectDB.php  資料庫](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/connectDB.php)
+ [logIn.php  登入](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/logIn.php)
+ [signUp.php  註冊](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/signUp.php)
+ [forgetPassword.php  忘記密碼](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/forgetPassword.php)
+ [moderator.php  檢舉](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/moderator.php)
+ [board.php  看版](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/board.php)
+ [home.php 首頁](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/home.php)
+ [article.php  發文/編輯文章]()

+ 搜尋
+ 排序文章
+ 看板全部


## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```

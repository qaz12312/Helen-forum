# 後端 - Helen






## 頁面
+ [connectDB.php  資料庫]()
+ [logIn.php  登入](C:\Users\88692\Documents\GitHub\softwareEngineeringProject\logIn.php)
+ [signUp.php  登出](C:\Users\88692\Documents\GitHub\softwareEngineeringProject\signUp.php)
+ [forgetPassword.php  忘記密碼]()
+ [moderator.php  檢舉]()
+ [board.php  看版]()
+ [home.php 首頁]()

## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```
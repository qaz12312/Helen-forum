# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 💎後端自己debug~
### 這是範例!!!所以不要改到這3個檔
+ 放在測試資料夾
+ [test.php debug會用到](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/test.php)
+ [logIn.php 是示範](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/logIn.php)
+ [personalInfo.php 是示範(若有整合成一個function)](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/personalInfo.php)
+ 在檔案中，你們需要改的地方:
    ```
    // 改 ///////////////////////////////////////////////////////////
       這裡就是你需要去做更改的地方~
    /////////////////////////////////////////////////////////////////
    ```
+ 檔案改完之後，將test.php和你要測試的檔案丟到C:\xampp\htdocs下，然後開Chrome打網址`http://localhost/你要測試的檔名.php`
+ 如果測試都成功了，記得git上去的時候Summary寫:ok: test all，要傳正確的檔案哦❗❗❗(把測試時改的code恢復原狀)

## 💎相同動作:整合在一起
+ 可參考 [changeNickname.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E5%9C%A8%E4%B8%80%E8%B5%B7%E4%BA%86/changeNickname.php)、[changePassword.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E5%9C%A8%E4%B8%80%E8%B5%B7%E4%BA%86/changePassword.php) 👉 整合成[personalInfo.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/personalInfo.php)
    + 整合成doChangeInfo()

### 💎git上去，Summary寫的資訊:
+ finish all 測試過了+code沒問題
+ finish: 完成的東西
    - Description寫還剩什麼
+ ok: test什麼功能

## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```



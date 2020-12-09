# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 💎後端自己debug~
### 這是範例!!!所以不要改到這3個檔
+ 放在測試資料夾
+ [index.php debug會用到](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/index.php)
+ [logIn.php 是示範](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/logIn.php)
+ [personalInfo.php 是示範(若有整合成一個function)](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/personalInfo.php)
+ 在檔案中，你們需要改的地方只有**index.php**:
    ```
    // 改 ///////////////////////////////////////////////////////////
       這裡就是你需要去做更改的地方~
    /////////////////////////////////////////////////////////////////
    ```
+ 檔案改完之後，將**index.php**和你**要測試的檔案**丟到C:\xampp\htdocs下，然後開Chrome打網址`http://localhost`
+ 如果測試都成功了，記得git上去的時候Summary寫:`ok: test all`，要傳正確的檔案哦❗❗❗(把測試時改的code恢復原狀)

## 💎相同動作:整合在一起
+ 可參考 [changeNickname.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E8%87%B3%E5%90%8C%E5%80%8Bfunc/changeNickname.php)、[changePassword.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E8%87%B3%E5%90%8C%E5%80%8Bfunc/changePassword.php) 👉 整合成[personalInfo.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/PDO%E5%8A%A0%E5%AF%86%E6%9C%AA%E5%AE%8C%E6%88%90/personalInfo.php)
    + 整合成doChangeInfo()

### 💎git上去，Summary寫的資訊:
+ ok: test什麼功能

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



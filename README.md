# 後端 - Helen
https://www.youtube.com/watch?v=L1cDgzaKv7g&list=PLUIJPCYQHhgywXtQ5-GJiow7bbbdk6zQx&index=1
## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

## 💎後端自己debug~
### 這是範例!!!所以不要改到這3個檔
+ 放在測試資料夾
+ [index.php debug會用到](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/index.php)
+ [logIn.php 是示範](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%B8%AC%E8%A9%A6/logIn.php)
+ 在檔案中，你們需要改的地方只有**index.php**:
    ```
    // 改 ///////////////////////////////////////////////////////////
       這裡就是你需要去做更改的地方~
    /////////////////////////////////////////////////////////////////
    ```
+ 檔案改完之後，將**index.php**和你**要測試的檔案**丟到C:\xampp\htdocs下，然後開Chrome打網址`http://localhost`
+ (完成version1)如果測試都成功了，記得git上去的時候Summary寫: `ok: test all`，要傳正確的檔案哦❗❗❗
+ (完成version2)如果debug成功，summary寫: `ok: debug all`
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



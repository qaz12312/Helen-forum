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
+ 如果測試都成功了，記得git上去的時候Summary寫:`ok: test all`，要傳正確的檔案哦❗❗❗(把測試時改的code恢復原狀)

## 💎相同動作:整合在一起
+ 可參考 [changeNickname.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E5%9C%A8%E4%B8%80%E8%B5%B7%E4%BA%86/changeNickname.php)、[changePassword.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/%E6%95%B4%E5%90%88%E5%9C%A8%E4%B8%80%E8%B5%B7%E4%BA%86/changePassword.php) 👉 整合成[personalInfo.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/personalInfo.php)
    + 整合成doChangeInfo()

### 💎git上去，Summary寫的資訊:
+ ok: test什麼功能

## 💎可能會需要
+ 資料庫(型態、有無預設值、是否為唯一)
    + 屬性選`UNSIGNED`，那資料在儲存的時候，就不會用上負數，所以資料就可以多一倍
    + `Unique`:確保這個欄位的資料都沒有重複ex.account、email
    + `A_I` (auto increment):保證遞增，但不保證是連續的(因為若有資料id=5被刪除了，再次新增，就會從id=6開始)
    + 把很常用的欄位建立index
        + `create index userID_Idx on Users(UserID)`
    + `varchar`:適合文字量少，可以有預設值
    + `text`:適合文字量多，不可以有預設值
    + 查詢速度：
        + `char` 最快， `varchar` 次之，`text` 最慢
        + 能用 varchar 的时候就不用 text
    + 日期 datetime:預設值改成 current timestamp
+  若有用到`delete`，注意是否是比較重要的欄位，如果是的話，可以建一個 is_deleted 欄位，放boolean值，如果要刪除他就把此欄位設成 1
    + 所以要篩選資料的時候，where會將上條件 ： `where is_deleted = 0`

## 加密
```
<?php
$str=123; //要加密的文字
$encodeletter = base64_encode($str); //加密
echo $encodeletter;
echo base64_decode($encodeletter); //解密
?>
```



# Helen

<<<<<<< HEAD
## 網站:[herokuapp](https://helen-ntou.herokuapp.com/)
## 後端door:[index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
## 記得到[Trello](https://trello.com/b/2amh64r0/helen)做紀錄

## merge
=======
## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + (在PHPs資料夾)個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式

### 記得到[Trello](https://trello.com/b/2amh64r0/helen)做紀錄

### 有問題可以先上[Trello](https://trello.com/b/2amh64r0/helen)相關連結的`後端問題集`看~



## 加密
>>>>>>> backEnd
```
git clone https://github.com/ytchao0234/softwareEngineeringProject.git
```
<<<<<<< HEAD
+ PersonalProfileForm 整個個人資料(主要修改的那區+文字{bar以下})
+ PersonalProfile 個人資料
+ CollectionCatalog 收藏目錄
+ PostingRecord 發文紀錄
+ wrapper :bar個人資料收藏目錄發文紀錄
+ wrapper2  主要修改的那區
+ InputWrap 每個輸入的框
+ InputWrap PersonEditBtn 個人修改頁面的修改按鈕
+ Page 收藏目錄的各個看版
+ PageName 收藏目錄的各個看版名子
+ PostBost 
=======
### token
```
$str = accountID."010helen";
$token = base64_encode($str);
$_SESSION[$token] = array("account"=>accountID,"permission"=>1/2/3,"ip"=>ip位址,"log"=>log操作紀錄);
```

### 紀錄dir
+ old version 12-14 : 12/14日完成的
+ PHPs : 目前在master的版本，最穩定版，12/17日完成的
+ add token : (account、permission、登入ip、操作紀錄檔) + (加解密account、password)
>>>>>>> backEnd

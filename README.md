# 後端 - Helen

## 前端接口
+ [index.php](https://github.com/ytchao0234/softwareEngineeringProject/blob/backEnd/index.php)
    + 裡面有cmd["act"]的值
    + 個個php裡都有寫 前端to後端 、 後端to前端 的data & 取得格式


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



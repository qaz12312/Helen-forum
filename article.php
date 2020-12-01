 <!-- 前端 to 後端:
    let cmd = {};
    cmd["act"] = "publishArticle";
    cmd["account"] = 00757003@email.ntou.edu.tw;
    cmd[""] = ;
    cmd[""] = ;
    cmd[""] = ;
    cmd[""] = ;
    cmd[""] = ;
    cmd[""] = ;
    -->

<?php
    require_once 'connectDB.php'; //連線資料庫 
    $input = $_POST; // 從前端拿到資料
    //設定要使用的SQL指令
    $query = ("insert into Article values(?,?,?,?,?,?,?,?)");
    $stmt= $db->prepare($query);
    //執行SQL語法
    $result = $stmt->execute(array($input[''],$input[''],$input[''],$input[''],$input[''],$input[''],NOW(),$input['']));
?>
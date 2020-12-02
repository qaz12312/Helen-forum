 <!-- 前端 to 後端:
    let cmd = {};
    cmd["act"] = "publishArticle";
    cmd["account"] = 00757003@email.ntou.edu.tw;
    cmd["title"] = "基隆有哪些好吃的?";
    cmd["content"] = "如題";
    cmd["image"] = "";
    cmd["hashTag"] = "基隆";
    cmd["time"] = "2020-11-05 13:59:59";
    cmd["boardName"] = "美食";
    -->
<!-- 後端 to 前端
        dataDB.status
        dataDB.errorCode
        若 status = true:
           dataDB.data = ""
        否則
            dataDB.data = "" -->
    
<?php
    require_once 'connectDB.php'; //連線資料庫 
    $input = $_POST; // 從前端拿到資料
    $sql = ("SELECT `BoardID` FROM `Board` WHERE `BoardName` = ?");
    $stmt =  $conn->prepare($sql);
    $error= $stmt->execute(array($bname));
    $result = $stmt->fetchAll();
    $boardId = $result[0];
    //設定要使用的SQL指令
    $sql = ("INSERT INTO `Article` VALUES(?,?,?,?,?,?,?)");
    $stmt= $conn->prepare($sql);//提前預處理SQL query
    //執行SQL語法
    $result = $stmt->execute(array($input['account'],$input['title'],$input['content'],$input['image'],$input['hashTag'],$input["time"],$boardId));
    
?>


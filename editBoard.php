<?php 
       require_once 'connectDB.php'; //連線資料庫
      /*前端 to 後端:
        let cmd = {};
        cmd["act"] = "editBoard";
        cmd["boardName"] = "BoardName"
        cmd["account"] = "UserID"
        cmd["rule"] = "Rule"
        cmd["topArticleID"] = "TopArticleID"
    */ 
    /* 後端 to 前端
            dataDB.state
            dataDB.errorCode
            若 state = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].BoardID 
                    dataDB.data[i].BoardName 
                    dataDB.data[i].UserID 
                    dataDB.data[i].Rule 
                     dataDB.data[i].TopArticleID
                ) 
            否則
                
         */
    $updateSql="UPDATE `Board` SET `BoardName`='".$input['boardName']."'','`Rule`='".$input['rule']."'','`TopArticleID`='".$input['topArticleID']."'";
    $result=$conn->query($updateSql);
    if(!$result){
        die($conn->error);
    }
    $sql ="SELECT `BoardName` FROM `Board` NATURAL JOIN`User` ON User.UserID =Board.UserID WHERE `BoardID`='".$input['boardID']."' AND`BoardName`='".$input['boardName']."'AND`Rule`='".$input['rule']."'AND`TopArticleID`='".$input['topArticleID']."'" ;
    global $conn;
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "沒有版";
        $rtn["data"] = "";
    }
    else{
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] = "";
    }
    echo json_encode($rtn);
?>
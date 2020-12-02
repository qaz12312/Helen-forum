<?php 
       require_once 'connectDB.php'; //連線資料庫
      /*前端 to 後端:
        let cmd = {};
        cmd["act"] = "editMode";
        cmd["boardID"] = "BoardID"
        cmd["boardName"] = "BoardName"
        cmd["userID"] = "UserID"
        cmd["rule"] = "Rule"
        cmd["topArticleID"] = "TopArticleID"
    */ 
    /* 後端 to 前端
            dataDB.state
            dataDB.errorCode
            若 state = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].UserID 
                    dataDB.data[i].UserColor 
                    dataDB.data[i].BoardName 
                ) 
            否則
                
         */
    $updateSql="UPDATE `Board` SET `UserID`='".$input['userID']."'";
    $result=$conn->query($updateSql);
    if(!$result){
        die($conn->error);
    }
    $sql ="SELECT `UserID`,`UserColor`,`BoardName` FROM `User` NATURAL JOIN `Board`  WHERE `UserID`='".$input['userID']."'" ;
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
        $arr=array();
        for($i=0;$i<$result->num_rows;$i++){
            $row=$result->fetch_row();
            $arr[$i]=$row[0];
        }
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] =$arr;
    }
    echo json_encode($rtn);
?>
<?php 
      /*前端 to 後端:
        let cmd = {};
        cmd["act"] = "editBoard";
        cmd["oldboardName"] = "BoardName"
        cmd["newboardName"] = "BoardName"
        cmd["account"] = "UserID"
        cmd["rule"] = "Rule"
    */ 
    /* 後端 to 前端
            
            若 status = true:
                dataDB.data = 更新後的版
               dataDB.status = true:
            否則
                dataDB.data = ""
               dataDB.errorCode = 沒有版/無權限刪除 
         */
    function doEditBoard($input){
        global $conn;
        $sqlcheck="SELECT `BoardName` FROM `Board` WHERE `BoardName`='".$input['oldboardName']."' AND `UserID`='".$input['account']."' ";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無權限刪除";
            $rtn["data"] = "";
        }
        else{
            $updateSql="UPDATE `Board` SET `BoardName`='".$input['newboardName']."',`Rule`='".$input['rule']."'where `BoardName`='".$input['oldboardName']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql ="SELECT `BoardName` FROM `Board` NATURAL JOIN`Users` WHERE `BoardName`='".$input['newboardName']."'AND`Rule`='".$input['rule']."'AND`UserID`='".$input['account']."'" ;
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
                $row=$result->fetch_row();
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $row;
            }
        }
        echo json_encode($rtn);
    }
?>

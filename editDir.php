<?php
    /* 
    前端 to 後端:
            let cmd = {};
            cmd["act"] = "editDir";
            cmd["account"] = "UserID"
            cmd["old"] ="我喜歡的"
            cmd["new"] ="我不喜歡的"

        */
		
         /* 後端 to 前端
            
            若 status = true:
                dataDB.data=更新後的資料夾名稱
				dataDB.status = true:
            否則
                dataDB.data=""
                dataDB.errorCode = 無權限修改 / 修改失敗
         */
    function doEditDir($input){
        global $conn;
        $sqlcheck="SELECT `DirName`,`UserID` FROM `KeepDir` WHERE `DirName`='".$input['old']."' AND `UserID`='".$input['account']."' ";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無權限修改";
            $rtn["data"] = "";
        }
        else{
            $updateSql="UPDATE `KeepDir` SET `DirName`='".$input['new']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`='".$input['account']."'  AND`DirName`='".$input['new']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "修改失敗";
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

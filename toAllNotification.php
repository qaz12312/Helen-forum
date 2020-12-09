<?php
    //require_once 'connectDB.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "toAllNotification";
			cmd["timer"] = "Times"
            cmd["content"] = "Content"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// UserID
				dataDB.data[1]	// Times
				dataDB.data[2]	// Content
            否則
                dataDB.data = ""
         */
    function doToAllNotification($input){    
        global $conn;
        $totalUser="SELECT `UserID`  FROM `Users` ";
        $result1=$conn->query($totalUser);
        if(!$result1){
            die($conn->error);
        }
        if($result1->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無使用者";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result1->num_rows;$i++){
                $row=$result1->fetch_row();
                $new="INSERT INTO  `Notice`(`UserID`,`Content`) 
                VALUES('".$row[0]."','".$input['content']."')";
                $resultNew=$conn->query($new);
                if(!$resultNew){
                    die($conn->error);
                }
                if($row[0]!="admin"){
                    $sql="SELECT `UserID`,`Times`,`Content` FROM `Notice` WHERE `UserID`=$row[0] AND`Content`='".$input['content']."' ";
                    $result=$conn->query($sql);
                    if(!$result){
                        die($conn->error);
                    }
                    if($result->num_rows <= 0){
                        $rtn = array();
                        $rtn["status"] = false;
                        $rtn["errorCode"] = "傳送通知失敗";
                        $rtn["data"] = "";
                    }
                }  
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
        echo json_encode($rtn);
    }
?>
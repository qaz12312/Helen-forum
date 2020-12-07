<?php
    require_once 'connectDB.php'; //連線資料庫 
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
        CREATE TABLE Users (
            UserID varchar(101) NOT NULL,
            Password varchar(9) NOT NULL,
            Permission numeric (1,0) NOT NULL,
            Color varchar(10) NOT NULL,
            Nickname varchar(21) ,
            PRIMARY KEY (UserID)
            ) ;

    global $input,$conn;
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
            $new="INSERT INTO  `Notice`(`UserID`,`Times`,`Content`) 
            VALUES('".$row[0]."','".$input['timer']."','".$input['content']."')";
            $resultNew=$conn->query($new);
            if(!$resultNEW){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Times`,`Content` FROM `Notice` WHERE `UserID`=$row[0] AND `Times`=$input['timer'] AND`Content`=$input['content'] ";
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
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
    }
    echo json_encode($rtn);
?>
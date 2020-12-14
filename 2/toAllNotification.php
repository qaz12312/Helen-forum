<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "toAllNotification";
	cmd["content"] = "Content";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data = "Successfully send notice to everyone."
	否則
		dataDB.errorCode = "Without any user." / "Failed to send Notification to everyone,Database exception."
		dataDB.data = ""
	*/
    function doToAllNotification($input){    
        global $conn;
        $totalUser="SELECT `UserID` FROM `Users`";
        $result1=$conn->query($totalUser);
        if(!$result1){
            die($conn->error);
        }
        if($result1->num_rows <= 0){
            errorCode("Without any user.");
        }
        else{
            for($i=0;$i<$result1->num_rows;$i++){
                $row=$result1->fetch_row();
                $new="INSERT INTO `Notice`(`UserID`,`Content`) VALUES('".$row[0]."','".$input['content']."')";
                $resultNew=$conn->query($new);
                if(!$resultNew){
                    die($conn->error);
                }
                $sql="SELECT `UserID`,`Times`,`Content` FROM `Notice` WHERE `UserID`=$row[0] AND`Content`='".$input['content']."'";
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($resultCount <= 0){
                    errorCode("Failed to send Notification to everyone,Database exception.");
                }
            }
            $rtn = successCode("Successfully send notice to everyone.");
        }
        echo json_encode($rtn);
    }
?>

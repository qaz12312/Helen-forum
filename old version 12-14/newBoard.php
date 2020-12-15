<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newBoard";
	cmd["boardName"] = "企鵝"

	後端 to 前端:
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data[0]	// BoardName
		dataDB.data[1]	// Rule
		dataDB.data[2]	// TopArticleID
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "Failed to upload board ,Database exception."
		dataDB.data = ""
	*/
    function doNewBoard($input){
        global $conn;
        $sql="SELECT `boardName`, `UserID` FROM `Board` WHERE `BoardName`='".$input['boardName']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "版面已新增";
            $rtn["data"] = "";
        }
        else{
            $admin="admin";
            $new="INSERT INTO  `Board`(`BoardName`,`UserID`,`Rule`,`TopArticleID`) VALUES('".$input['boardName']."','admin',NULL,NULL)";
            $resultNew=$conn->query($new);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `BoardName`,`Rule`,`TopArticleID` FROM `Board`  JOIN`Users` ON Users.UserID =Board.UserID WHERE `BoardName`='".$input['boardName']."' AND Users.UserID='".$admin."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to upload board ,Database exception.";
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

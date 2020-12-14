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
		dataDB.errorCode = "版面已新增" / "Failed to upload board ,Database exception."
		dataDB.data = ""
	*/
    function doNewBoard($input){
        global $conn;
        $sql="SELECT `boardName`, `UserID` FROM `Board` WHERE `BoardName`='".$input['boardName']."'";
        $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);

        if($resultCount > 0){
            errorCode("版面已新增");
        }
        else{
            $admin="admin";
            $sql="INSERT INTO  `Board`(`BoardName`,`UserID`,`Rule`,`TopArticleID`) VALUES('".$input['boardName']."','admin',NULL,NULL)";
            $resultNew=$conn->query($sql);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `BoardName`,`Rule`,`TopArticleID` FROM `Board`  JOIN`Users` ON Users.UserID =Board.UserID WHERE `BoardName`='".$input['boardName']."' AND Users.UserID='".$admin."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to upload board ,Database exception.");
            }
            else{
                $rtn = successCode($result);
            }
        }
        echo json_encode($rtn);
    }
?>

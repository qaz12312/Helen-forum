<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newBoard";
	cmd["boardName"] = "企鵝";
    cmd["rule"] = "Rule";

	後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
		dataDB.info = "Successfully new the board."
		dataDB.data[0]	// BoardName
		dataDB.data[1]	// Rule
		dataDB.data[2]	// TopArticleID
    否則 
		dataDB.errorCode = "Board exist" / "Failed to upload board, Database exception."
		dataDB.data = ""
	*/
    function doNewBoard($input){
        global $conn;
        $sql="SELECT EXISTS(SELECT 1  FROM `Board` WHERE `BoardName`=? LIMIT 1)";
        $arr = array($input['boardName']);
        $result = query($conn,$sql,$arr,"SELECT");
        if($result[0][0]){
            errorCode("Board exist.");
        }
        else{
            $sql="INSERT INTO `Board`(`BoardName`,`UserID`,`Rule`,`TopArticleID`) VALUES(?,?,?,?)";
            $arr = array($input['boardName'],"admin",$input['rule'],NULL);
            query($conn,$sql,$arr,"INSERT");

            $sql="SELECT `BoardName`,`Rule`,`TopArticleID` FROM `Board` JOIN `Users` ON Users.UserID =Board.UserID WHERE `BoardName`=? AND Users.UserID=?";
            $arr = array($input['boardName'], "admin");
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to upload board, Database exception.");
            }
            else{
                $rtn = successCode("Successfully new the board.",$result[0]);
            }
        }
        echo json_encode($rtn);
    }
?>

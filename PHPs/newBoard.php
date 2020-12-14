<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newBoard";
	cmd["boardName"] = "企鵝"
	(下面2行是否需要?因為有寫修改版規的php(editBoard)、版主的任命(editModerator))
	cmd["account"] "00752233"(還是說這個有其他用途?)
	cmd ["rule"]=Rule

	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0]	// BoardName
		dataDB.data[1]	// UserID
		dataDB.data[2]	// Rule
		dataDB.data[3]	// TopArticleID
	否則
		dataDB.errorCode = ???????
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
            $new="INSERT INTO  `Board`(`BoardName`,`UserID`,`Rule`,`TopArticleID`) VALUES('".$input['boardName']."','admin','".$input['rule']."',NULL)";
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
                $rtn["errorCode"] = "註冊失敗，資料庫異常";
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

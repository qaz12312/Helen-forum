<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newArticle";
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["blockName"] ="美食";
	cmd["title"] = "Title";
	cmd["content"] = "Content"
	cmd["picture"] = "Image"
	cmd["hashTag"] ="HashTag"
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
		dataDB.info = ""
		dataDB.data = ""
    否則
		dataDB.errorCode = "You have been already published this article before." / "Failed to upload article,Database exception."
		dataDB.data = ""
	*/
    function doNewArticle($input){
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
        // 	$userInfo = $_SESSION[$token];
            $user = $userInfo['account'];
            $user = $input['account'];
            if(empty($input['hashTag'])){
                $hashTag = json_encode(array());
            }
            else{
                $hashTag = json_encode($input['hashTag']);
            }
            $sql="SELECT EXISTS(SELECT 1  FROM `Article`  JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `AuthorID` = ? AND `Title`= ? AND`Content`= ? AND`Image`= ? AND`HashTag`= ? AND`BlockName`= ? LIMIT 1)";
            $arr = array($user, $input['title'], $input['content'], $input['picture'], $hashTag, $input['blockName']);
            $result = query($conn,$sql,$arr,"SELECT");
            if($result[0][0]==1){
                errorCode("You have been already published this article before.");
            }
            else{
                $sql="INSERT INTO  `Article`(`AuthorID`,`Title`,`Content`,`Image`,`HashTag`,`BlockName`) VALUES(?,?,?,?,?,?)";
                $arr = array($user, $input['title'], $input['content'], $input['picture'], $hashTag, $input['blockName']);
                query($conn,$sql,$arr,"INSERT");
                // writeRecord($user,$userInfo["log"],"publish the articleID:".$input['articleID']);
                $rtn = successCode("Successfully new the Article.",array());
            }
                echo json_encode($rtn);
		// }
    }
?>

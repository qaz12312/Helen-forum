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
    cmd['video'] = "video";
    cmd["hashTag"] ="HashTag"
    cmd['anonymous'] = 0/ 1 (是否要匿名)
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
		dataDB.info = "Successfully new the Article."
		dataDB.data = ""
    否則
		dataDB.errorCode = "You have been already published this article before." / "Failed to upload article,Database exception."
		dataDB.data = ""
	*/
    function doNewArticle($input){
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        if(empty($input['hashTag'])){
            $hashTag = json_encode(array(), JSON_UNESCAPED_UNICODE);
        }
        else{
            $hashTag = json_encode($input['hashTag'], JSON_UNESCAPED_UNICODE);
        }
	    if(empty($input['picture'])){
            $input['picture'] = "";
        }
        if(empty($input['video'])){
            $input['video'] = "";
        }
        $sql="SELECT EXISTS(SELECT 1 FROM `Article` JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `AuthorID` = ? AND `Title`= ? AND`Content`= ? AND`Image`= ? AND `Video`=? AND`HashTag`= ? AND`BlockName`= ? LIMIT 1)";
        $arr = array($user, $input['title'], $input['content'], $input['picture'],$input['video'], $hashTag, $input['blockName']);
        $result = query($conn,$sql,$arr,"SELECT");
        if($result[0][0]){
            errorCode("You have been already published this article before.");
        }
        else{
            ////
            $sql="INSERT INTO  `Article`(`AuthorID`,`Title`,`Content`,`Image`,`Video`,`HashTag`,`BlockName`,`Anonymous`) VALUES(?,?,?,?,?,?,?,?)";
            $arr = array($user, $input['title'], $input['content'], $input['picture'],$input['video'], $hashTag, $input['blockName'], $input['anonymous']);
            query($conn,$sql,$arr,"INSERT");
            // writeRecord($user,$userInfo["log"],"publish the article Title:".$input['title']);
            writeRecord($user,"New Article","article Title:【".$input['title']."】.");
            $rtn = successCode("Successfully new the Article.",array());
        }
            echo json_encode($rtn);
    }
?>

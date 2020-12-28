<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newArticle";
	cmd["account"] = "AuthorID"; //cmd["token"]
	cmd["blockName"] ="美食";
	cmd["title"] = "Title";
	cmd["content"] = "Content"
	cmd["picture"] = "Image"
	cmd["hashTag"] ="HashTag"
	
	後端 to 前端:
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.info = ""
		dataDB.data[0]	// ArticleID
		dataDB.data[1]	// Title
		dataDB.data[2]	// Content
		dataDB.data[3]	// Image
		dataDB.data[4]	// HashTag
		dataDB.data[5]	// Time
		dataDB.data[6]	// Color
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "Failed to upload article,Database exception."
		dataDB.data = ""
	*/
    function doNewArticle($input){
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
        $sql="INSERT INTO  `Article`(`AuthorID`,`Title`,`Content`,`Image`,`HashTag`,`BlockName`) VALUES(?,?,?,?,?,?)";
        
		//$hashTag = json_encode($input['hashTag']);
		$hashTag = $input['hashTag'];
		$arr = array($input['account'], $input['title'], $input['content'], $input['picture'], $hashTag, $input['blockName']);
		$result = query($conn,$sql,$arr,"INSERT");
		$rtn = successCode("Successfully new the Article.",array());
		
		/*

		流水號問題!!!!!!!!!!!!!!!!!

        $articleID=mysqli_insert_id($conn);//取得流水號
        $sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Times`,`Color` FROM `Article`  JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `ArticleID`=?";
        $arr = array($articleID);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Failed to upload article,Database exception.");
        }
        else{
            $rtn = successCode("Successfully new the Article.",$result[0]);
		}
		*/
        echo json_encode($rtn);
    }
?>

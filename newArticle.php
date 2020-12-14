<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "addArticle";
	cmd["articleID"] = ArticleID;(是否不用傳呢，我記得是用流水號的樣子?)
	cmd["account"] = "AuthorID";
	cmd["blockName"] ="美食";
	cmd["title"] = "Title";
	cmd["content"] = "Content"
	cmd["picture"] = "Image"
	cmd["hashTag"] ="HashTag"
	cmd["timer"] ="Time"
	
	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[0]	// ArticleID
		dataDB.data[1]	// AuthorID
		dataDB.data[2]	// Title
		dataDB.data[3]	// Content
		dataDB.data[4]	// Image
		dataDB.data[5]	// HashTag
		dataDB.data[6]	// Time
		dataDB.data[7]	// Color
	否則
		dataDB.errorCode = ??????
		dataDB.data = ""
	*/
    function doNewArticle($input){
        global $conn;
        $new="INSERT INTO  `Article`(`AuthorID`,`Title`,`Content`,`Image`,`HashTag`,`BlockName`) 
        VALUES('".$input['account']."','".$input['title']."','".$input['content']."','".$input['picture']."','".$input['hashTag']."','".$input['blockName']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
            die($conn->error);
        }
        $articleID=mysqli_insert_id($conn);//取得流水號
        $sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Times`,`Color` FROM `Article` NATURAL JOIN`Users` WHERE `ArticleID`=$articleID";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Failed to upload article.";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] = $row[0];
            $rtn["articleID"] =$articleID;
        }
        echo json_encode($rtn);
    }
?>

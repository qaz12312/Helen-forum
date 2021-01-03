<?php
    /*  
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInBoard";
    cmd["account"]="00757033"; //cmd["token"] (若是訪客則不用)
    cmd["boardName"] = "美食";
    cmd["sort"] = "time/hot/collect/comment";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Without any article in board now." / "Successfully sort in board.";
        dataDB.data[i] //有i筆文章
        (
            dataDB.data[i].title //第i筆文章的標題
            dataDB.data[i].articleID
            dataDB.data[i].like //第i筆文章的總愛心數
            dataDB.data[i].keep//第i筆文章的總收藏數
            dataDB.data[i].time//第i筆文章的時間
             dataDB.data[i].hasLike//是否按過愛心
            dataDB.data[i].hasKeep //是否收藏
        )
        dataDB.data.topArticleID //置頂文章
        dataDB.data.rule // 板規
    否則
        dataDB.errorCode = "Failed to sort in board." / "Failed."
        dataDB.data = ""
    */
    function doSortBoard($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
        if ($input['sort'] == "time" || $input['sort'] == "hot" || $input['sort'] == "collect" || $input['sort'] == "comment") {
            if ($input['sort'] == "time") {
                $sql="SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = ? ORDER BY `Times` DESC";
            } else if ($input['sort'] == "hot"){
                $sql="SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = ? ORDER BY `cntHeart` DESC";
			} else if ($input['sort'] == "collect"){
                $sql="SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = ? ORDER BY `cntKeep` DESC";
            } else {
				$sql = "SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` LEFT JOIN `HomeComment` USING (ArticleID) WHERE `BoardName` = ? ORDER BY `cntComment` DESC";
			}
            $sql="SELECT `Rule`,`TopArticleID` FROM `Board` WHERE `BoardName`=?";
            $arr = array($input['boardName']);
            $result2 = query($conn,$sql,$arr,"SELECT");
            $result2Count = count($result);
            if ($result2Count <= 0) {
                $rtn = successCode("Failed.", array());
            } 
            $arr = array($input['boardName']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);


            if ($resultCount <= 0) {
                $rtn = successCode("Without any article in board now.", array("topArticleID"=>$result2[0]['TopArticleID'],"rule"=>$result2[0]['Rule']));
            } 
            else {
                $articleList = array();
                for($i=0;$i<$resultCount;$i++){
                    $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    // if(isset($input['token'])){
                    //     $token =$input['token'];
                    //     if(!isset($_SESSION[$token])){
                    //         errorCode("token doesn't exist.");
                    //     }
                    //     $userInfo = $_SESSION[$token];
                    //     $user = $userInfo['account'];
                    // } 
                    if(isset($input['account'])){
                        $user = $input['account'];

                        $sql = "SELECT EXISTS(SELECT 1 FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=? LIMIT 1)";
                        $heart = query($conn, $sql, array($articleID, $user), "SELECT");
                        $hasLike = $heart[0][0];

                        $sql = "SELECT EXISTS(SELECT 1 FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=? LIMIT 1)";
                        $keep = query($conn, $sql, array($articleID, $user), "SELECT");
                        $hasKeep = $keep[0][0];
                    } 
                    else{
                        $hasLike = 0 ;
                        $hasKeep = 0 ;
                    }
                    $articleList[$i] = array("title" => $row['Title'], "articleID" => $articleID , "like" => $row['cntHeart'], "keep" => $row['cntKeep'], "hasLike" => $hasLike, "hasKeep" =>$hasKeep);
                }
                $arr = array("articleList"=>$articleList,"topArticleID"=>$result2[0]['TopArticleID'],"rule"=>$result2[0]['Rule']);
                $rtn = successCode("Successfully sort in board.",$arr);
            }
        } else {
            errorCode("Failed to sort in board.");
        }
        echo json_encode($rtn);
    }
?>

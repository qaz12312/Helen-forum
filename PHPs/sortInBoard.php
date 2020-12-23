<?php
    /*  板歸rule 置頂文章 top articleID
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInBoard";
    cmd["account"]="00757033";
    cmd["boardName"] = "美食";
    cmd["sort"] = "time/hot/collect/comment";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.data[i] //有i筆文章
        dataDB.info
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
        dataDB.errorCode = "Failed to sort in board." / "Without any article in board now."
        dataDB.data = ""
    */
    function doSortBoard($input){
        global $conn;
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
            $arr = array($input['boardName']);
            $result = query($conn,$sql,$arr,"SELECT1");
            $resultCount = count($result);

            $sql="SELECT `Rule`,`TopArticleID` FROM `Board` WHERE `BoardName`=?";
            $arr = array($input['boardName']);
            $result2 = query($conn,$sql,$arr,"SELECT2");
            $result2Count = count($result);

            if ($resultCount <= 0) {
                $rtn = successCode("Without any article in board now.");
            } 
            else {
                // print_r($result);
                // echo "<br/><br/>";
                // print_r($result2);
                $articleList = array();
                // foreach($result as $row){
                for($i=0;$i<$resultCount;$i++){
                    $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    if(isset($input['account'])){
                        $sql="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=?" ;
                        $arr = array($articleID, $input['account']);
                        $heart = query($conn,$sql,$arr,"SELECT3");
                        $heartCount = count($heart);
    
                        $sql ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=?" ;
                        $arr = array($articleID, $input['account']);
                        $keep = query($conn,$sql,$arr,"SELECT4");
                        $keepCount = count($keep);
    
                        $articleList[$i] = array("title" => $row['Title'], "articleID" => $articleID , "like" => $row['cntHeart'], "keep" => $row['cntKeep'], "hasLike" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
                    } else
                        $articleList[$i] = array("title" => $row['Title'], "articleID" => $articleID , "like" => $row['cntHeart'], "keep" => $row['cntKeep'], "hasLike" => NULL, "hasKeep" =>NULL);
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

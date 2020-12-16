<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInMenu";
    cmd["account"] = "00757033";
    cmd["sort"] = "time/hot";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 dataDB.status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
            dataDB.data[i].title //第i筆文章的標題
            dataDB.data[i].blockName //第i筆文章的所屬看板
            dataDB.data[i].articleID
            dataDB.data[i].like //第i筆文章的總愛心數
            dataDB.data[i].keep//第i筆文章的總收藏數
            dataDB.data[i].time //第i筆文章的時間
        )
    否則
        dataDB.errorCode = "Without any article now." / "Failed to sort."
        dataDB.data = ""
    */ 
    function doSortMenu($input){
        global $conn;
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql="SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` ORDER BY `Times` DESC";
            } else{
                $sql="SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` ORDER BY `cntHeart` DESC";
            }
            $result = query($conn,$sql,array(),"SELECT");
            $resultCount = count($result);
            if ($resultCount <= 0) {
                errorCode("Without any article now.");
            } else {
                $arr = array();
                foreach($result as $row){
                // for($i=0;$i<$resultCount;$i++){
                //     $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    if(isset($input['account'])){
                        $sql ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=?" ;
                        $arr = array($articleID, $input['account']);
                        $heart = query($conn,$sql,$arr,"SELECT");
                        $heartCount = count($heart);

                        $sql ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=?" ;
                        $arr = array($articleID, $input['account']);
                        $keep = query($conn,$sql,$arr,"SELECT");
                        $keepCount = count($keep);

                        $arr[$i] = array("title" => $row[0], "boardName" => $row[1], "articleID" => $articleID , "like" => $row[3], "keep" => $row[4], "hasHeart" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
                    }else
                        $arr[$i] = array("title" => $row[0], "boardName" => $row[1], "articleID" => $articleID , "like" => $row[3], "keep" => $row[4], "hasHeart" => "", "hasKeep" =>"");
                }
                $rtn = successCode($arr);
            }
        }else{
            errorCode("Failed to sort.");
        }
        echo json_encode($rtn);
    }
?>
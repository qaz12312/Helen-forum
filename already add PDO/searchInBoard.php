<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "searchBoard";
    cmd["searchBoard"] = "美食";
    cmd["account"]="00757033";
    cmd["sort"] = "time/hot";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].articleID //第i筆文章的id
        dataDB.data[i].like //第i筆文章的總愛心數
        dataDB.data[i].keep //第i筆文章的總收藏數
        dataDB.data[i].hasHeart//第i筆文章的是否按過愛心
        dataDB.data[i].hasKeep//第i筆文章的是否收藏
    否則
        dataDB.errorCode = "Don't have any article in board." / "Failed to search in board."
        dataDB.data = ""
    */
    function doSearchBoard($input){
        global $conn;
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%?%' OR `Title` LIKE '%?%' AND `BoardName` =? ORDER BY `Times` DESC";
            }else{
                $sql = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE (`Content` LIKE '%?%' OR `Title` LIKE '%?%') AND `BoardName` =? ORDER BY `cntHeart` DESC";
            }
            $arr = array($input['searchWord'],$input['searchWord'], $input['searchBoard']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if ($resultCount <= 0) {    //找不到文章
                errorCode("Don't have any article in board.");
            } 
            else {
                $arr = array();
                foreach($result as $row){
                // for($i=0;$i<$resultCount;$i++){//回傳找到的文章(包含關鍵字)
                //     $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    $sql ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=?" ;
                    $arr = array($articleID, $input['account']);
                    $heart = query($conn,$sql,$arr,"SELECT");
                    $heartCount = count($heart);

                    $sql ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=?" ;
                    $arr = array($articleID, $input['account']);
                    $keep = query($conn,$sql,$arr,"SELECT");
                    $keepCount = count($keep);

                    $arr[$i]= array("title" => $row[0],  "articleID" => $articleID, "like" => $row[2], "keep" => $row[3], "hasHeart" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
                }
                $rtn = successCode($arr);
            }
        }
        else {
            errorCode("Failed to search in board.");
        }
        echo json_encode($rtn);
    }
?>

<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInBoard";
    cmd["account"]="00757033";
    cmd["boardName"] = "美食";
    cmd["sort"] = "time/hot";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.data[i] //有i筆文章
        (
            dataDB.errorCode
            dataDB.data[i].title //第i筆文章的標題
            dataDB.data[i].articleID
            dataDB.data[i].like //第i筆文章的總愛心數
            dataDB.data[i].keep//第i筆文章的總收藏數
            dataDB.data[i].time//第i筆文章的時間
        )
    否則
        dataDB.errorCode = "Failed to sort in board." / "Without any article in board now."
        dataDB.data = ""
    */
    function doSortBoard($input){
        global $conn;
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql="SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = '" . $input['boardName'] . "'ORDER BY `Times` DESC";
                $arr = array();
            } else{
                $sql="SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = '".$input['boardName']."'ORDER BY `cntHeart` DESC";
                $arr = array();
            }
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if ($resultCount <= 0) {
                errorCode("Without any article in board now.");
            } else {
                $arr = array();
                foreach($result as $row){
                // for($i=0;$i<$resultCount;$i++){
                //     $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    $sql="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`='".$articleID ."'AND`UserID`='".$input['account']."'" ;
                    $arr = array();
                    $heart = query($conn,$sql,$arr,"SELECT");
                    $heartCount = count($heart);

                    $sql ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`='".$articleID ."'AND`UserID`='".$input['account']."'" ;
                    $arr = array();
                    $keep = query($conn,$sql,$arr,"SELECT");
                    $keepCount = count($keep);

                    $arr[$i] = array("title" => $row[0], "articleID" => $articleID , "like" => $row[2], "keep" => $row[3], "hasHeart" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
                }
                $rtn = successCode($arr);
            }
        } else {
            errorCode("Failed to sort in board.");
        }
        echo json_encode($rtn);
    }
?>

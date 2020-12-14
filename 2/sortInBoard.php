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
    function doSortBoard($input)
    {
        global $conn;
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql1 = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = '" . $input['boardName'] . "'ORDER BY `Times` DESC";
                $result = $conn->query($sql1);
                if (!$result) {
                    die($conn->error);
                }
            } else if ($input['sort'] == "hot") {
                $sql1 = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = '".$input['boardName']."'ORDER BY `cntHeart` DESC";
                $result = $conn->query($sql1);
                if (!$result) {
                    die($conn->error);
                }
            }
            if ($resultCount <= 0) {
                errorCode("Without any article in board now.");
            } else {
                $arr = array();
                for ($i = 0; $i < $resultCount; $i++) {
                    $row = $result->fetch_row();
                    $sqlHeart ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`='".$row[1]."'AND`UserID`='".$input['account']."'" ;
                    $heart = $conn->query($sqlHeart);
                    if (!$heart) {
                        die($conn->error);
                    }
                    $sqlKeep ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`='".$row[1]."'AND`UserID`='".$input['account']."'" ;
                    $keep = $conn->query($sqlKeep);
                    if (!$keep) {
                        die($conn->error);
                    }
                    $log = array("title" => "$row[0]", "articleID" => "$row[1]", "like" => "$row[2]", "keep" => "$row[3]", "hasHeart" => ( $heart->num_rows>0 ? 1 : 0), "hasKeep" => ($keep->num_rows>0 ? 1 : 0 ));
                    $arr[$i] = $log;
                }
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $arr;
            }
        } else {
            errorCode("Failed to sort in board.");
        }
        echo json_encode($rtn);
    }
?>

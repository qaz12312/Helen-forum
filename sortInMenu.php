<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInMenu";
    cmd["account"] = "00757033";
    cmd["sort"] = "time/hot";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.statue
    若 dataDB.statue = true:
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
        dataDB.errorCode = "沒有文章" / "sort input wrong"
        dataDB.data = ""
    */ 
    function doSortMenu($input)
    {
        global $conn;
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql1 = "SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` ORDER BY `Times` DESC";
                $result = $conn->query($sql1);
                if (!$result) {
                    die($conn->error);
                }
            } else if ($input['sort'] == "hot") {
                $sql1 = "SELECT `Title`,`BoardName`,`ArticleID`, `cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` ORDER BY `cntHeart` DESC";
                $result = $conn->query($sql1);
                if (!$result) {
                    die($conn->error);
                }
            }
            if ($result->num_rows <= 0) {
                $rtn = array();
                $rtn["statue"] = false;
                $rtn["errorCode"] = "沒有文章";
                $rtn["data"] = "";
            } else {
                $arr = array();
                for ($i = 0; $i < $result->num_rows; $i++) {
                    $row = $result->fetch_row();
                    $sqlHeart ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`='".$row[2]."'AND`UserID`='".$input['account']."'" ;
                    $heart = $conn->query($sqlHeart);
                    if (!$heart) {
                        die($conn->error);
                    }
                    $sqlKeep ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`='".$row[2]."'AND`UserID`='".$input['account']."'" ;
                    $keep = $conn->query($sqlKeep);
                    if (!$keep) {
                        die($conn->error);
                    }
                    $log = array("title" => "$row[0]", "blockName" => "$row[1]", "articleID" => "$row[2]", "like" => "$row[3]", "keep" => "$row[4]", "hasHeart" => ( $heart->num_rows>0 ? 1 : 0), "hasKeep" => ($keep->num_rows>0 ? 1 : 0 ));
                    $arr[$i] = $log;
                }
                $rtn = array();
                $rtn["statue"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $arr;
            }
        }else{
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "sort input wrong";
            $rtn["data"] = "";
        }
        echo json_encode($rtn);
    }
?>
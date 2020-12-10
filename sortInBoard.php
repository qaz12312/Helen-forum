<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sortInBoard";
    cmd["sort"] = "time/hot";
    cmd["boardName"] = "美食"
    
    後端 to 前端:
    dataDB.state
    若 state = true:
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
        dataDB.errorCode = "sort input wrong" / "沒有文章"
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
                $sql1 = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep`,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName` = '" . $input['boardName'] . "'ORDER BY `cntHeart` DESC";
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
                    $log = array("title" => "$row[0]", "articleID" => "$row[1]", "like" => "$row[2]", "keep" => "$row[3]", "time" => "$row[4]");
                    $arr[$i] = $log;
                }
                $rtn = array();
                $rtn["statue"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $arr;
            }
        } else {
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "sort input wrong";
            $rtn["data"] = "";
        }
        echo json_encode($rtn);
    }
?>

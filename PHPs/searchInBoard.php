<?php

// ?????

/*
前端 to 後端:
let cmd = {};
cmd["act"] = "searchBoard";
cmd["searchBoard"] = "美食";
cmd["account"]="00757033";
cmd["searchWord"] = "好吃";
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
function doSearchBoard($input)
{
    global $conn;
    if ($input['sort'] == "time" || $input['sort'] == "hot") {
        if ($input['sort'] == "time") {
            $sql = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE ( ";/* '%?%' OR `Title` LIKE '%?%' AND `BoardName` =? ORDER BY `Times` DESC";*/
            $arrsize = count($input["searchWord"]);
            $a = str_repeat("'%?%' OR ",  $arrsize-1);
            $sql = $sql . $a;
            $sql = $sql . "'%?%' OR `Title` LIKE ";
            $sql = $sql . $a;
            $sql = $sql . "'%?%') AND `BoardName` =? ORDER BY `Times` DESC;";
            
            $i = 0;
            foreach($input["searchWord"] as $value){
                $search[$i++] = $value;
            }
            foreach($input["searchWord"] as $value){
                $search[$i++] = $value;
            }
            $search[$i] = $input['searchBoard'];
        } else {
            $sql = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE (";/*'%?%' OR `Title` LIKE '%?%' AND `BoardName` =? ORDER BY `cntHeart` DESC";*/
            $arrsize = count($input["searchWord"]);
            $a = str_repeat("'%?%' OR ",  $arrsize-1);
            $sql = $sql . $a;
            $sql = $sql . "'%?%' OR `Title` LIKE ";
            $sql = $sql . $a;
            $sql = $sql . "'%?%') AND `BoardName` =? ORDER BY `cntHeart` DESC;";
            
            $i = 0;
            foreach($input["searchWord"] as $value){
                $search[$i++] = $value;
            }
            foreach($input["searchWord"] as $value){
                $search[$i++] = $value;
            }
            $search[$i] = $input['searchBoard'];
        }
       /* arrsize=count($x);
        a="LIKE '%?%' OR"*arrsize;
        sql = "SELECT `Title`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM ".a;

        $arr(...)//8
        $i = 3;
        foreach($x as $v){
            $arr[$i++]=$v;
        }*/

        $arr = $search;

        $result = query($conn, $sql, $arr, "SELECT");
        $resultCount = count($result);
        if ($resultCount <= 0) { //找不到文章
            errorCode("Don't have any article in board.");
        } else {
            $arr = array();
            for ($i = 0; $i < $resultCount; $i++) {
                $row = $result[$i];
                $articleID = $row['ArticleID'];
                if (isset($input['account'])) {
                    $sql = "SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=?";
                    $arr = array($articleID, $input['account']);
                    $heart = query($conn, $sql, $arr, "SELECT");
                    $heartCount = count($heart);

                    $sql = "SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=?";
                    $arr = array($articleID, $input['account']);
                    $keep = query($conn, $sql, $arr, "SELECT");
                    $keepCount = count($keep);

                    $articleList[$i] = array("title" => $row[0], "articleID" => $articleID, "like" => $row[2], "keep" => $row[3], "hasLike" => ($heartCount > 0 ? 1 : 0), "hasKeep" => ($keepCount > 0 ? 1 : 0));
                } else
                    $articleList[$i] = array("title" => $row[0], "articleID" => $articleID, "like" => $row[2], "keep" => $row[3], "hasLike" => "", "hasKeep" => "");
            }
            $arr = array("articleList" => $articleList, "topArticleID" => $result2[0][1], "rule" => $result2[0][0]);
            $rtn = successCode($arr);
        }
    } else {
        errorCode("Failed to search in board.");
    }
    echo json_encode($rtn);
}

<?php
/* 前端 to 後端:
let cmd = {};
cmd["act"] = "searchMenu";
cmd["searchWord"] = "美食";
cmd["sort"] = "time/hot";
後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
 dataDB.data[i] //有i筆文章
   (
     dataDB.data[i].title //第i筆文章的標題
	 dataDB.data[i].blockName //第i筆文章的所屬看板
	 dataDB.data[i].articleID //第i筆文章的id
     dataDB.data[i].like //第i筆文章的總愛心數
     dataDB.data[i].keep //第i筆文章的總收藏數
    ) 
否則
    dataDB.data = "沒有文章"*/
function doSearchMenu($input)
{
    global $conn;
    //搜尋標題+內容
    //View: HomeHeart,HomeKeep  
    if ($input['sort'] == "time" || $input['sort'] == "hot") {
        if ($input['sort'] == "time") {
            $sql3 = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `Times` DESC";
            $result = $conn->query($sql3);
            if (!$result) {
                die($conn->error);
            }
        }else if ($input['sort'] == "hot") {
            $sql3 = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `cntHeart` DESC";
            $result = $conn->query($sql3);
            if (!$result) {
                die($conn->error);
            }
        }

        if ($result->num_rows <= 0) {    //找不到文章
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
        } else {
            $arr = array();
            for ($i = 0; $i < $result->num_rows; $i++) {    //回傳找到的文章(包含關鍵字)
                $row = $result->fetch_row();
                $log = array("title" => "$row[0]", "blockName" => "$row[1]", "articleID" => "$row[2]", "like" => "$row[3]", "keep" => "$row[4]");
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

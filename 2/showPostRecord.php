<?php 
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showPostRecord";
    cmd["account"] = "userid";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
            dataDB.data[i].title //第i筆文章的標題
            dataDB.data[i].blockName //第i筆文章的所屬看板
            dataDB.data[i].articleID
            dataDB.data[i].like //第i筆文章的總愛心數
            dataDB.data[i].keep//第i筆文章的總收藏數
        ) 
    否則
            dataDB.errorCode = "No article right now."
        dataDB.data = ""
    */
    function doShowPostRecord($input){
        global $conn;
        $sql="SELECT `BlockName`,`Title`,`ArticleID` FROM `Article`  WHERE `AuthorID`='".$input['account']."'order by `Times` DESC";
        $arr = array();
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("No article right now.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row=$result->fetch_row();
                $log=array("blockName"=>"$row[0]","title"=>"$row[1]","articleID"=>"$row[2]");
                $arr[$i]=$log;
            }
            $rtn = successCode($arr);
        }
        echo json_encode($rtn);
    }
?>

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
            dataDB.errorCode = "沒有文章"
        dataDB.data = ""
    */
    function doShowPostRecord($input){
        global $conn;
        $sql="SELECT `BlockName`,`Title`,`ArticleID` FROM `Article`  WHERE `AuthorID`='".$input['account']."'order by `Times` DESC";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("blockName"=>"$row[0]","title"=>"$row[1]","articleID"=>"$row[2]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>

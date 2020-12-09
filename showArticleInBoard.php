<?php
   // require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "showArticleInBoard";
            cmd["boardName"] = "BoardName";
        */
        /* 後端 to 前端
            dataDB.state
            dataDB.errorCode
            若 state = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].title //第i筆文章的標題
                    dataDB.data[i].blockName //第i筆文章的所屬看板
                    dataDB.data[i].articleID
                    dataDB.data[i].like //第i筆文章的總愛心數
                    dataDB.data[i].keep//第i筆文章的總收藏數
                ) 
            否則
                dataDB.data = ""*/
    function doShowArticleInBoard($input){
        global $conn;
        $sql="SELECT `Title`,`ArticleID` ,`cntHeart`,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName`='".$input['boardName']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        $rule="SELECT `Rule`,`TopArticleID` FROM `Board` WHERE `BoardName`='".$input['boardName']."'";
        $result2=$conn->query($rule);
        if(!$result2 || !$result2){
            die($conn->error);
        }
        if($result->num_rows <= 0 ){
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            $row2=$result->fetch_row();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","articleID"=>"$row[1]","like"=>"$row[2]","keep"=>"$row[3]");
                $rtn["data"]["articleList"][$i]=$row;
            }
            $rtn["data"]["topArticleID"] =$row2[1];
            $rtn["data"]["rule"] =$row2[0];
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
         }
        echo json_encode($rtn);
    }
?>
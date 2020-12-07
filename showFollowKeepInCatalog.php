<?php
    require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "home";
            cmd["account"] = "userid";
            cmd["collectionCatalog"] = "abc";
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

        $sql="SELECT `Title`,`ArticleID`  FROM `KeepDir` NATURAL JOIN  `FollowKeep` ON　FollowKeep.UserID=KeepDir.UserID 　NATURAL JOIN`Article` ON　FollowKeep.ArticleID=Article.ArticleID WHERE UserID='".$input['account']."'";

        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["statue"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","articleID"=>"$row[1]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>
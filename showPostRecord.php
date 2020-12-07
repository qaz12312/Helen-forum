<?php
    require_once 'connectDB.php'; //連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "home";
            cmd["account"] = "userid";
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
                DROP TABLE IF EXISTS Article;
                CREATE TABLE Article (
                    ArticleID bigint(255) NOT NULL AUTO_INCREMENT,
                    AuthorID varchar(101) NOT NULL,
                    Title varchar(255) NOT NULL,
                    Content text ,
                    Image longblob ,
                    HashTag varchar(255) ,
                    Times datetime DEFAULT CURRENT_TIMESTAMP,
                    BlockName varchar(255) NOT NULL,
                PRIMARY KEY (ArticleID),
                FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
                FOREIGN KEY (BlockName) REFERENCES Board (BoardName)
                ) CHARSET=utf8mb4 ;


        $sql="SELECT `Title`,`ArticleID`,`BlockName` FROM `Article`  WHERE `AuthorID`='".$input['account']."'";

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
                $log=array("title"=>"$row[0]","articleID"=>"$row[1]","blockName"=>"$row[2]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>
<?php
require_once 'noSecurity.php';//連線資料庫 
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "home";
        */
        /* 後端 to 前端
            dataDB.state
            dataDB.errorCode
            若 state = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].title //第i筆文章的標題
                    dataDB.data[i].blockName //第i筆文章的所屬看板
                    dataDB.data[i].like //第i筆文章的總愛心數
                    dataDB.data[i].keepID//第i筆文章的總收藏數
                ) 
            否則
                dataDB.data = ""*/


        $sql="SELECT `Title`,`Name`, COUNT(`Like`),COUNT(`Keep`) FROM `Article`JOIN `Board` 
         ON Article.BlockID= Board.BlockID JOIN `Follow` ON  Article.ArticleID = Follow.ArticleID
         group by `Name` " ;

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
                $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
?>
<? php 
   // $sql="CREATE VIEW Home AS SELECT `ArticleID`,`AuthorID`,`Title`,`Content`,`Image`,`HashTag`,`Time`,`BlockID` FROM `Article` group by ";
/*function Sort($){//排序 $sql SELECT 的值
    $object
}*/
function boardList(){
    /* 後端 to 前端
            dataDB.state
            dataDB.errorCode
            若 state = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].BoardName //文章名稱
                ) 
            否則
                dataDB.data = ""
         */
    $sql ="SELECT `BoardName` FROM `Board`" ;
    global $conn;
    $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有版";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $arr[$i]=$row[0];
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
}
function showNotice(){
    $sql ="SELECT `Time`,`Content` FROM `Notice` where `UserID`= ???? order by `Time`asc" ;
    global $conn;
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "沒有";
        $rtn["data"] = "";
    }
    else{
        $arr=array();
        for($i=0;$i<$result->num_rows;$i++){
            $row=$result->fetch_row();
            $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
            $arr[$i]=$log;
        }
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] =$arr;
    }
    echo json_encode($rtn);
}
function clickNotice( $Note){ //點通知 PRIMARY KEY ('UserID', 'Time', 'Content')
    /* 前端 to 後端:
            Note["ID"] = "UserID";
            Note["Time"] = "Time";
            Note["detail"] = "Content";
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 state = true:
                dataDB.data[0] // success or not
            否則
                dataDB.data = ""
         */
    $sql ="DELETE FROM  `Notice` where `UserID`=$Note->ID, `Time`=$Note->Time,`Content`=$Note->detail" ;
    global $conn;
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "沒有";
        $rtn["data"] = "";
    }
    else{
        $arr=array();
        for($i=0;$i<$result->num_rows;$i++){
            $row=$result->fetch_row();
            $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
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
<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "browseReport";
    cmd["boardName"] = "企鵝";

    後端 to 前端
    dataDB.status
    dataDB = JSON.parse(data);
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data // 檢舉
        (
            dataDB.data[0].title  // 第1筆檢舉的Title
            dataDB.data[0].reason // 第1筆通知的Reason
            ...
        )
    否則
        dataDB.errorCode = "無檢舉文章"
        dataDB.data = ""
    */
    function doBrowseReport($input){ //查看board底下的文章檢舉
    	global $conn;
        $sql="SELECT `Title`,`Reason`,Report.Times FROM `Report` JOIN `Article`  ON Article.ArticleID = Report.ArticleID  WHERE  `BlockName`='".$input['boardName']."'ORDER BY `Times` DESC ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "無檢舉文章";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","reason"=>"$row[1]","times"=>"$row[2]");
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



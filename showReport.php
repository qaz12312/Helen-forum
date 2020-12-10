<?php
	/*
	前端 to 後端:
    let cmd = {};
    cmd["act"] = "reportPage";
	
	後端 to 前端
    dataDB.status
    dataDB.errorCode
    若 status = true:
	dataDB.data[i]
	(
		dataDB.data[i].articleID
		dataDB.data[i].reason
		dataDB.data[i].title
	)
    否則
	dataDB.data = ""
	*/
	function doShowReport($input){
        global $conn;
        $sql="SELECT `ArticleID`,`Title`,`Reason` FROM `Report` JOIN `Article` ON Article.ArticleID = Report.ArticleID order by Report.Times ASC";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "檢舉文章為空";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("Title"=>"$row[0]","Reason"=>"$row[1]");
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
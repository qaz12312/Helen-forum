<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "boardList";
	
	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[i] //有i筆boardName
	否則
		dataDB.errorCode =
		dataDB.data = 
	*/
    function doBoardList($input){
        global $conn;
        $sql="SELECT `BoardName` FROM `Board` ";
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
                $log=array("boardName"=>"$row[0]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>

<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showBoardList";
	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[i] //有i筆boardName
	否則
		dataDB.errorCode = "Without any board now."
		dataDB.data = ""
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
            $rtn["status"] = false;
            $rtn["errorCode"] = "";
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
            $rtn["errorCode"] = "Without any board now.";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>

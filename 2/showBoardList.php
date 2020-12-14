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
        $sql="SELECT `BoardName` FROM `Board`";
       $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Without any board now.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row=$result->fetch_row();
                $arr[$i]=$row[0];
            }
            $rtn = successCode($arr);
        }
        echo json_encode($rtn);
    }
?>

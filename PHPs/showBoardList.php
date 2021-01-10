<?php
	/* 
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showBoardList";
    	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Without any board now." / "Successfully show boardName list."
        dataDB.data[i] //有i筆boardName
        (
            dataDB.data[i].boardName
            dataDB.data[i].moderator
            dataDB.data[i].rule
        )
	否則
		dataDB.errorCode = "Without any board now."
		dataDB.data = ""
	*/
    function doBoardList($input){
        global $conn;
        $sql="SELECT `BoardName`,`UserID`,`Rule` FROM `Board`";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Without any board now.", array());
        }
        else{
			$arr=array();
			for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("boardName"=>$row[0],"moderator"=>$row[1],"rule"=>$row[2]);
            }
            $rtn = successCode("Successfully show boardName list.",$arr);
        }
        echo json_encode($rtn);
    }
?>

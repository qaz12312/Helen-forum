<?php
	/* 
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showBoardList";
    cmd["account"]="00757033";
	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = ""
        dataDB.data[i].boardName //有i筆boardName
        dataDB.data[i].isModerator
	否則
		dataDB.errorCode = "Without any board now."
		dataDB.data = ""
	*/
    function doBoardList($input){
        global $conn;
        $sql="SELECT `BoardName`,`Rule` FROM `Board`";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Without any board now.", array());
        }
        else{
			$arr=array();
			for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $sql="SELECT `BoardName`,`Rule` FROM `Board`";
                $result = query($conn,$sql,$result[$i],"SELECT");
                $arr[$i]=array("boardName"=>$row[0],"rule"=>$row[1],"isModerator"=>);
            }
            $rtn = successCode("Successfully show boardName list.",$arr);
        }
        echo json_encode($rtn);
    }
?>

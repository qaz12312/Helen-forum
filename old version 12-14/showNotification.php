<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showNotice";
	cmd["account"] = "00757007";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data[i] //有i筆通知
		(
			dataDB.data.time]	// Time
			dataDB.data.content	// Content
		)
	否則
		dataDB.errorCode = "No notifications right now."
		dataDB.data = ""
	*/
    function doShowNotification($input){
        global $conn;
        $sql="SELECT `Times`,`Content` FROM `Notice` WHERE `UserID`='".$input['account']."' order by `Times`DESC ";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "No notifications right now.";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("time"=>"$row[0]","content"=>"$row[1]");
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

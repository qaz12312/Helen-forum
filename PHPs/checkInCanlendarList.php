<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "checkInCanlendarList";
    cmd["id"] = 0;
    cmd["isPass"]=1/0

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
		dataDB.info = "Successfully canceled this report." / "Successfully deleted this article which you report."
		dataDB.data = ""
    否則
		dataDB.errorCode = "This activity doesn't exit."
		dataDB.data = "" 
	*/
    function doCheckInCanlendarList($input){ //審核活動
        global $conn;
        $sql="SELECT `Title`,`Start`,`END` FROM `Calendars` WHERE `ID`= ? AND `IsValid`= ? ";  
            $arr = array($input['id'],0);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("This activity doesn't exit.");
            }
            else{
                if($input['isPass']){ 
                    $sql="UPDATE `Calendars` SET `IsValid`=?  WHERE `ID`=? ";
                    $arr = array(true,$input['id'] );
                    query($conn,$sql,$arr,"UPDATE");
                    $rtn = successCode("Successfully update to Calendar.",array());
                }
                else { //刪除活動
                    $sql="DELETE FROM `Calendars` WHERE `ID`= ? AND `IsValid`= ? ";
                    $arr = array($input['id'],0);
                    query($conn,$sql,$arr,"DELETE");
                    $rtn = successCode("Successfully canceled this activity.",array());
                }
            }
        echo json_encode($rtn);
    }
?>

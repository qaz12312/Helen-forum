<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "checkInCanlendarList";
	cmd["isPass"] = true / false; (通過審核/審核不通過)
    cmd["title"] = "聖誕節";
    cmd["startTime"] = "2020/12/25";
    cmd["endTime"] = "202012/25";

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.info = "Successfully canceled this report." / "Successfully deleted this article which you report."
		dataDB.data = ""
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "This activity doesn't exit."
		dataDB.data = "" 
	*/
    function doCheckInCanlendarList($input){ //審核被檢舉文章
        global $conn;
        $sql="SELECT `Title`,`Start`,`END` FROM `Calendar` WHERE `Title`=? AND `Start`=? AND `END`=? ";  
            $arr = array($input['title'],$input['startTime'],$input['endTime']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("This activity doesn't exit.");
            }
            else{
                if($input['isPass']){//刪除文章
                    $sql="UPDATE `Calendar` SET `IsValid`=?  WHERE `Title`=? AND `Start`=? AND `END`=? ";
                    $arr = array(true,$input['title'],$input['startTime'],$input['endTime']);
                    query($conn,$sql,$arr,"UPDATE");
                    $rtn = successCode("Successfully update to Calendar.",array());
                }
                else {
                    $sql="DELETE FROM `Calendar` WHERE `Title`=? AND `Start`=? AND `END`=?";
                    $arr = array($input['title'],$input['startTime'],$input['endTime']);
                    query($conn,$sql,$arr,"DELETE");
                    $rtn = successCode("Successfully canceled this activity.",array());
                }
            }

        echo json_encode($rtn);
    }
?>

<?php 
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showPostRecord";
    cmd["account"] = "userid"; //cmd["token"]

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "No article right now." / "Successfully show person's article records.";
        dataDB.data[i] //有i筆文章
        (
            dataDB.data[i].title //第i筆文章的標題
            dataDB.data[i].blockName //第i筆文章的所屬看板
            dataDB.data[i].articleID
        ) 
    否則
        dataDB.errorCode = "";
        dataDB.data = "";
    */
    function doShowPostRecord($input){ // 發文紀錄
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT `BlockName`,`Title`,`ArticleID` FROM `Article`  WHERE `AuthorID`=? order by `Times` DESC";
        $result = query($conn,$sql,array($user),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("No article right now.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("blockName"=>$row[0],"title"=>$row[1],"articleID"=>$row[2]);
            }
            $rtn = successCode("Successfully show person's article records.",$arr);
        }
        echo json_encode($rtn);
    }
?>

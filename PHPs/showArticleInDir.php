<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleInDir";
    cmd["account"] = "userid"; //cmd["token"]
    cmd["dirName"] = "abc";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = ""
        dataDB.data[i] //有i筆文章在此收藏資料夾下
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].articleID
        ) 
    否則
        dataDB.errorCode = "Article not in the dir which names ".$input['dirName']." in this user."
        dataDB.data = ""
    */
    function doShowArticleInDir($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT `Title`,`ArticleID`  FROM `KeepDir` NATURAL JOIN `FollowKeep` NATURAL JOIN`Article` WHERE `UserID`=? AND`DirName`=?";
        $arr = array($user, $input['dirName']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Article not in the dir which names ".$input['dirName']." in this user.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i] = array("title"=>$row[0],"articleID"=>$row[1]);
            }
            $rtn = successCode("Successfully article in dictionary.",$arr);
        }
        echo json_encode($rtn);
    }
?>

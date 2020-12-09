<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteComment";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["articleID"] =ArticleID
    cmd["floors"] = Floor

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data= "成功刪除此留言"
    否則
        dataDB.errorCode = "You don't have permission to do this action." / "此留言不存在" / "刪除失敗，資料庫異常"
        dataDB.data = ""
    */
    function doDeleteComment($input){
        global $conn;
        $token =$input['token'];
        if(!isset($_SESSION[$token])){
           $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "You don't have permission to do this action.";
            $rtn["data"] = "";
        }else{
            $userInfo = $_SESSION[$token];
            $sqlcheck="SELECT `ArticleID` FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$userInfo['account']."' AND`Floor`='".$input['floors']."'";  
            $result=$conn->query($sqlcheck);
            if(!$result){
                die($conn->error);
            } 
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "此留言不存在";
                $rtn["data"] = "";
            }
            else{    
                $del="DELETE FROM `Comments` WHERE  `AuthorID`='".$userInfo['account']."' AND`Floor`='".$input['floors']."'";
                $result=$conn->query($del);
                    if(!$result){
                        die($conn->error);
                    }
                $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`TagFloor` FROM `Comments` WHERE `AuthorID`='".$userInfo['account']."' AND`Floor`='".$input['floors']."'";
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($result->num_rows > 0){
                    $rtn = array();
                    $rtn["status"] = false;
                    $rtn["errorCode"] = "刪除失敗，資料庫異常";
                    $rtn["data"] = "";
                }
                else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "成功刪除此留言";
                }
            }
        }
        echo json_encode($rtn);
    }
?>
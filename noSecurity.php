<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");

    require_once 'connectDB.php';//連線資料庫 
    $conn = mysqli_connect($serverName, $userName, $password,$databaseName);

    if($conn->connect_error){
        die($conn->connect_error);
    }
    mysqli_query($conn, 'SET NAMES utf8'); //避免中文字亂碼 
    
    $input = $_POST; // 從前端拿到資料

    switch($input["act"]){
        case "logIn": //登入
            doLogIn();
            break;
        case "creatAccount": //註冊
            doCreate();
            break;

        case "forgottenPwd": //忘記密碼
            doPwd();
            break;
        case "home": // 系統首頁
            // doHome();
            home.php
            break;
        // case "insertLog":
        //     doInsert();
        //     break;

        // case "showLog":
        //     doShow();
        //     break;
		case "report":	//檢視檢舉
		  admin.php
    }

    function doLogIn(){
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "logIn";
            cmd["account"] = 00757003@email.ntou.edu.tw;
            cmd["password"] = zxsss123;
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data[0] // UserID
                dataDB.data[1] // Password
                dataDB.data[2] // Permissions
                dataDB.data[3] // Color
                dataDB.data[4] // Nickname
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="SELECT `UserID`,`Password`,`Permissions`,`Color`,`Nickname` FROM `User` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "找不到會員";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
    }

    function doCreate()
    {
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "creatAccount";
            cmd["account"] = 00757003@email.ntou.edu.tw;
            cmd["password"] = zxsss123;
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data[0] // UserID
                dataDB.data[1] // Password
                dataDB.data[2] // Permissions
                dataDB.data[3] // Color
                dataDB.data[4] // Nickname
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="SELECT `UserID` FROM `User` WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }

        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "帳號已註冊";
            $rtn["data"] = "";
        }
        else{
            $new="INSERT INTO  `User`(`UserID`,`Password`,`Permissions`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."',1,'\#0d33ff','".$input['password']."')";
            $resultNEW=$conn->query($new);
            if(!$resultNEW){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Password`,`Permissions`,`Color`,`Nickname` FROM `User` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "註冊失敗，資料庫異常";
                $rtn["data"] = "";
            }
            else{
                $row=$result->fetch_row();
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $new[0];
            }
        }
        echo json_encode($rtn);
    }

    function doPwd()
    {
        /*
        - 傳驗證信到信箱
        UserID
        Password
        */
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "forgottenPwd";
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data
            否則
                dataDB.data = ""
        */
    }

    function doHome()
    {
        /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "home";
        */
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
                dataDB.data[i] //有i筆文章
                (
                    dataDB.data[i].title //第i筆文章的標題
                    dataDB.data[i].blockName //第i筆文章的所屬看板
                    dataDB.data[i].like //第i筆文章的總愛心數
                    dataDB.data[i].keepID//第i筆文章的總收藏數
                ) 
            否則
                dataDB.data = ""
         */
        global $input,$conn;
        $sql="SELECT `ArticleID`,`Title`,`Time`,`BlockID` FROM `Article`";

        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "沒有文章";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row\();
                $log=array("title"=>"$row[0]","blockName"=>"$row[1]","like"=>"$row[2]","keepID"=>"$row[3]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
    function showArticleList(){

    }
    function showArticle(){

    }
?>
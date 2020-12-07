<?php
	header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");
	error_reporting(1);
	error_reporting(E_ALL);
    // $input = json_decode(file_get_contents('php://input', 'r'), true); 
    $input = $_POST;
    require_once("./PHPs/connectDB.php");
    $conn = connSql();
	switch($input["act"]){
        case "logIn": //登入
	        require_once("./PHPs/logIn.php");
            doLogIn($input);
            break;
        case "browseAuthority": //獲得權限+所管理的版
            require_once("./PHPs/browseAuthority.php");
            doBrowseAuthority($input);
            break;
        case "creatAccount": //註冊
            require_once("./PHPs/signUp.php");
	        doCreatAccount($input);
            break;
        case "logOut": //登出
            require_once("./PHPs/logOut.php");
	        doLogOut($input);
            break;
        // case "forgetPassword": //忘記密碼
        //     require_once("forgetPassword.php");
        //     doForgetPassword($input);
        //     break;
        case "modifyPersonalInfo": //修改個資
            require_once("./PHPs/personalInfo.php");
            break;
    }
?>
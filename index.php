<?php
	header("Access-Control-Allow-Origin: *");
    header("Content-Type:text/html; charset=utf-8");
    date_default_timezone_set("Asia/Taipei");
    $input = json_decode(file_get_contents('php://input', 'r'), true); 
    require_once("connectDB.php");
	$conn = connSql();
	switch($input["act"]){
        // case "logIn": //登入
	    //     require_once("login.php");
	    //     doLogin($input);
	    //     break;
        // case "creatAccount": //註冊
        //     signUp.php;
        //     break;

        // case "forgottenPwd": //忘記密碼
        //     forgetPassword.php;
        //     break;
        // case "home": // 系統首頁
        //     home.php
        //     break;
        // case "publishArticle"://新增文章
        //     publishArticle.php
        // case "report":	//檢視檢舉
        //     admin.php
        //     break;
    }
?>